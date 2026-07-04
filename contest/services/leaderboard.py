"""Live / cached leaderboard payloads (cache stored on ``Contest``)."""

from django.utils import timezone

from contest.exceptions import ContestJsonValidationError
from contest.models import Contest, ContestAttempt
from core.models import User
from contest.schemas import (
    LeaderboardEntryPayload,
    leaderboard_entries_to_jsonable,
    parse_leaderboard_payload,
)
from contest.services.questions import get_contest_answer_key_map
from contest.services.ranking import max_submitted_response_elapsed_seconds
from contest.services.scoring import grade_attempt_against_keys, user_answer_selection


def _correct_options_map(contest: Contest) -> dict[str, list[int]]:
    return get_contest_answer_key_map(contest)


def _provisional_progress(attempt: ContestAttempt) -> tuple[float, int, int]:
    """
    When no answer key yet: score = questions answered with a choice (not skipped empty);
    correct_answers uses the same count for the API shape. n_touched is tie-breaker.
    """
    answers = list(attempt.answers.all())
    n_touched = len(answers)
    n_with_choice = sum(
        1 for a in answers if not a.is_skipped and user_answer_selection(a)
    )
    return float(n_with_choice), n_with_choice, n_touched


def build_leaderboard_payload(contest: Contest, limit: int | None = None) -> list[dict]:
    """
    Leaderboard rows for every contest attempt (submitted or in progress).

    With a loaded question set (each row includes ``cop``): score and correct_answers from the
    marking scheme. Without loaded questions / key: provisional ranking by answered question count.

    Tie-break (after score): lower max elapsed time among non-skipped answers with a
    selection (``created_at - started_at`` per response; skips ignored).
    """
    correct_options = _correct_options_map(contest)
    has_key = bool(correct_options)

    attempts = list(
        ContestAttempt.objects.filter(contest=contest)
        .select_related("user")
        .prefetch_related("answers")
    )

    rows: list[dict] = []
    for attempt in attempts:
        max_elapsed = max_submitted_response_elapsed_seconds(attempt)
        user = attempt.user
        if has_key:
            score, ncorrect, nwrong, nskipped = grade_attempt_against_keys(
                attempt,
                correct_options,
                contest.marking_scheme,
            )
            row = {
                "user_id": user.pk,
                "score": score,
                "correct_answers": ncorrect,
                "wrong_answers": nwrong,
                "skipped_questions": nskipped,
                "username": user.username,
                "full_name": user.get_full_name() or user.username,
                "_max_elapsed": max_elapsed,
            }
        else:
            score, ncorrect, n_touched = _provisional_progress(attempt)
            row = {
                "user_id": user.pk,
                "score": score,
                "correct_answers": ncorrect,
                "wrong_answers": None,
                "skipped_questions": None,
                "username": user.username,
                "full_name": user.get_full_name() or user.username,
                "_max_elapsed": max_elapsed,
                "_total_touched": n_touched,
            }
        rows.append(row)

    if has_key:
        rows.sort(key=lambda r: (-r["score"], r["_max_elapsed"]))
    else:
        rows.sort(
            key=lambda r: (-r["score"], -r["_total_touched"], r["_max_elapsed"])
        )

    for i, r in enumerate(rows):
        if i == 0:
            r["rank"] = 1
        else:
            prev = rows[i - 1]
            if r["score"] == prev["score"] and r["_max_elapsed"] == prev["_max_elapsed"]:
                r["rank"] = prev["rank"]
            else:
                r["rank"] = i + 1

    for r in rows:
        del r["_max_elapsed"]
        r.pop("_total_touched", None)

    entries: list[LeaderboardEntryPayload] = []
    slice_rows = rows if limit is None else rows[:limit]
    for r in slice_rows:
        entries.append(
            LeaderboardEntryPayload(
                rank=r["rank"],
                user_id=int(r["user_id"]),
                username=r["username"],
                full_name=r["full_name"],
                score=float(r["score"]),
                correct_answers=r["correct_answers"],
                wrong_answers=r.get("wrong_answers"),
                skipped_questions=r.get("skipped_questions"),
            )
        )
    return leaderboard_entries_to_jsonable(entries)


def get_leaderboard_cached(contest: Contest) -> list[dict]:
    """
    Return leaderboard rows from the ``Contest`` row cache when still fresh.

    **Single rule:** reuse cache only while ``now < computed_at + 5 minutes``. After that,
    always recompute from the database and store a new payload.

    Applies to **live and ended** contests alike so that:
    - scoring / ranking code fixes propagate within one TTL without manual steps, and
    - traffic spikes are still bounded (at most one full rebuild per contest per 5 minutes
      under steady polling).

    Clients that poll every ~5 minutes (e.g. live leaderboard) stay aligned with this TTL.
    """
    now = timezone.now()
    ttl = timezone.timedelta(minutes=5)

    payload = contest.leaderboard_cache_payload or []
    computed_at = contest.leaderboard_cache_computed_at
    if computed_at is not None and now < computed_at + ttl:
        try:
            return leaderboard_entries_to_jsonable(parse_leaderboard_payload(payload))
        except ContestJsonValidationError:
            pass
    new_payload = build_leaderboard_payload(contest)
    contest.leaderboard_cache_payload = new_payload
    contest.leaderboard_cache_computed_at = now
    contest.save(update_fields=["leaderboard_cache_payload", "leaderboard_cache_computed_at"])
    return new_payload


def get_leaderboard(contest: Contest) -> list[dict]:
    return get_leaderboard_cached(contest)


def get_leaderboard_me_for_user(user: User | None, contest: Contest, entries: list[dict]) -> dict | None:
    """
    If the user has a ContestAttempt for this contest, return rank/score from the live leaderboard
    (graded when an answer key exists, provisional otherwise). ``submitted`` is informational only.
    """
    if user is None or not user.is_authenticated:
        return None
    attempt = (
        ContestAttempt.objects.filter(user=user, contest=contest)
        .select_related("user")
        .first()
    )
    if attempt is None:
        return None
    u = attempt.user
    out: dict = {
        "user_id": u.pk,
        "submitted": attempt.is_submitted,
        "rank": None,
        "score": None,
        "correct_answers": None,
        "wrong_answers": None,
        "skipped_questions": None,
        "username": u.username,
        "full_name": u.get_full_name() or u.username,
    }
    for row in entries:
        if int(row["user_id"]) == u.pk:
            out["rank"] = row["rank"]
            out["score"] = float(row["score"])
            out["correct_answers"] = row["correct_answers"]
            wa = row.get("wrong_answers")
            sq = row.get("skipped_questions")
            out["wrong_answers"] = wa if wa is not None else None
            out["skipped_questions"] = sq if sq is not None else None
            return out
    return out
