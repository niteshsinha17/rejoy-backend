"""Derive official score / correct count / rank from saved answers (no persisted attempt columns)."""

from __future__ import annotations

from contest.models import Contest, ContestAttempt
from contest.services.questions import get_contest_answer_key_map
from contest.services.scoring import score_attempt_against_keys, user_answer_selection


def max_submitted_response_elapsed_seconds(attempt: ContestAttempt) -> float:
    """
    Longest elapsed time from attempt start to answer save, among non-skipped responses
    that include a selected option. Skipped / empty answers are ignored.
    """
    started = attempt.started_at
    if started is None:
        return 0.0
    max_secs = 0.0
    for answer in attempt.answers.all():
        if answer.is_skipped or not user_answer_selection(answer):
            continue
        elapsed = (answer.created_at - started).total_seconds()
        max_secs = max(max_secs, elapsed)
    return max_secs


def official_scores_and_ranks(contest: Contest) -> dict[int, tuple[float, int, int]]:
    """
    Requires a complete answer key (stored or derived from question ``cop`` values).
    Returns ``attempt.pk -> (score, n_correct, rank)``.
    Tie-break and dense ranks match ``build_leaderboard_payload``: lower max response elapsed
    among non-skipped answers. Equal score and elapsed time share rank.
    """
    correct_options = get_contest_answer_key_map(contest)
    if len(correct_options) != contest.total_questions:
        return {}
    attempts = list(
        ContestAttempt.objects.filter(contest=contest).prefetch_related("answers")
    )
    graded: list[tuple[ContestAttempt, float, int]] = []
    for att in attempts:
        s, nc = score_attempt_against_keys(att, correct_options, contest.marking_scheme)
        graded.append((att, float(s), int(nc)))
    graded.sort(
        key=lambda t: (
            -t[1],
            max_submitted_response_elapsed_seconds(t[0]),
        )
    )
    by_pk: dict[int, tuple[float, int, int]] = {}
    for i, (att, s, nc) in enumerate(graded):
        if i == 0:
            rnk = 1
        else:
            prev_att, prev_s, _ = graded[i - 1]
            prev_elapsed = max_submitted_response_elapsed_seconds(prev_att)
            elapsed = max_submitted_response_elapsed_seconds(att)
            if s == prev_s and elapsed == prev_elapsed:
                rnk = by_pk[prev_att.pk][2]
            else:
                rnk = i + 1
        by_pk[att.pk] = (s, nc, rnk)
    return by_pk
