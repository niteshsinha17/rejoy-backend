"""Per-user contest result (after contest end and answer key exists)."""

from django.utils import timezone

from contest.exceptions import NotRegisteredError, ResultsNotReleasedError
from contest.models import Contest, ContestAttempt
from contest.services.questions import get_contest_answer_key_map
from contest.services.ranking import official_scores_and_ranks
from core.models import User


def get_result(user: User, contest: Contest) -> dict:
    now = timezone.now()
    if now < contest.end_time:
        raise ResultsNotReleasedError(
            "Personal results are available only after the contest has ended."
        )
    if not get_contest_answer_key_map(contest):
        raise ResultsNotReleasedError(
            "Results are not ready yet. Contest questions or the answer key are not fully loaded."
        )
    attempt = ContestAttempt.objects.filter(user=user, contest=contest).first()
    if not attempt:
        raise NotRegisteredError(
            "You did not take part in this contest, so there is no score or rank to show."
        )
    answer_map = get_contest_answer_key_map(contest)
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
