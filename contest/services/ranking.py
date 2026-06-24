"""Derive official score / correct count / rank from saved answers (no persisted attempt columns)."""

from __future__ import annotations

from contest.models import Contest, ContestAttempt
from contest.services.scoring import score_attempt_against_keys


def official_scores_and_ranks(contest: Contest) -> dict[int, tuple[float, int, int]]:
    """
    Requires a complete ``answer_key_json``. Returns ``attempt.pk -> (score, n_correct, rank)``.
    Tie-break and dense ranks match ``generate_results`` / leaderboard (``started_at``, then ``pk``).
    """
    answer_map = contest.answer_key_json or {}
    if len(answer_map) != contest.total_questions:
        return {}
    correct_options = {
        str(qid): sorted(int(x) for x in (opts or []))
        for qid, opts in answer_map.items()
    }
    attempts = list(
        ContestAttempt.objects.filter(contest=contest).prefetch_related("answers")
    )
    graded: list[tuple[ContestAttempt, float, int]] = []
    for att in attempts:
        s, nc = score_attempt_against_keys(att, correct_options, contest.marking_scheme)
        graded.append((att, float(s), int(nc)))
    graded.sort(key=lambda t: (-t[1], t[0].started_at, t[0].pk))
    by_pk: dict[int, tuple[float, int, int]] = {}
    for i, (att, s, nc) in enumerate(graded):
        if i == 0:
            rnk = 1
        else:
            prev_att, prev_s, _ = graded[i - 1]
            if s == prev_s:
                rnk = by_pk[prev_att.pk][2]
            else:
                rnk = i + 1
        by_pk[att.pk] = (s, nc, rnk)
    return by_pk
