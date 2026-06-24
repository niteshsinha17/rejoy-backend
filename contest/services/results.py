"""Per-user contest result (after contest end and answer key exists)."""

from django.utils import timezone

from contest.exceptions import NotRegisteredError, ResultsNotReleasedError
from contest.models import Contest, ContestAttempt
from contest.services.ranking import official_scores_and_ranks
from core.models import User


def get_result(user: User, contest: Contest) -> dict:
    now = timezone.now()
    if now < contest.end_time:
        raise ResultsNotReleasedError(
            "Personal results are available only after the contest has ended."
        )
    if not contest.answer_key_json:
        raise ResultsNotReleasedError(
            "Results are not ready yet. The official answer key has not been published for this contest."
        )
    attempt = ContestAttempt.objects.filter(user=user, contest=contest).first()
    if not attempt:
        raise NotRegisteredError(
            "You did not take part in this contest, so there is no score or rank to show."
        )
    answer_map = contest.answer_key_json or {}
    score = correct_answers = rank = None
    if len(answer_map) == contest.total_questions:
        attempt = ContestAttempt.objects.prefetch_related("answers").get(pk=attempt.pk)
        metrics = official_scores_and_ranks(contest)
        if attempt.pk in metrics:
            score, correct_answers, rank = metrics[attempt.pk]

    total_participants = ContestAttempt.objects.filter(contest=contest).count()
    return {
        "attempt": attempt,
        "score": score,
        "correct_answers": correct_answers,
        "rank": rank,
        "total_participants": total_participants,
    }
