"""Contest attempt lifecycle: start, save answers, submit."""

from typing import Optional

from django.utils import timezone

from contest.exceptions import (
    AlreadySubmittedError,
    AttemptExpiredError,
    ContestNotLiveError,
    MultipleSelectionsNotAllowedError,
    NotRegisteredError,
    UnknownContestQuestionError,
)
from contest.models import Contest, ContestAttempt, ContestQuestionAttempt, ContestStatus
from contest.services.questions import build_question_list, contest_question_choice_type
from core.models import User


def _invalidate_leaderboard_cache(contest: Contest) -> None:
    Contest.objects.filter(pk=contest.pk).update(
        leaderboard_cache_payload=[],
        leaderboard_cache_computed_at=None,
    )


def start_attempt(user: User, contest: Contest) -> dict:
    if contest.status == ContestStatus.UPCOMING:
        raise ContestNotLiveError(
            "This contest has not started yet. Please wait until the scheduled start time."
        )

    existing_attempt = ContestAttempt.objects.filter(user=user, contest=contest).first()
    if contest.status == ContestStatus.ENDED and not existing_attempt:
        raise ContestNotLiveError(
            "This contest has ended and you did not start an attempt, so you can no longer enter."
        )

    attempt, _ = ContestAttempt.objects.get_or_create(user=user, contest=contest)

    answered = list(attempt.answers.values("question_id", "selected_options", "is_skipped"))

    reveal = contest.status == ContestStatus.ENDED
    questions = build_question_list(contest, reveal)

    return {
        "answered_questions": answered,
        "is_submitted": attempt.is_submitted,
        "questions": questions,
    }


def save_answer(
    user: User,
    contest: Contest,
    question_id: str,
    is_skipped: bool,
    selected_options: Optional[list] = None,
) -> dict:
    if contest.status != ContestStatus.LIVE:
        raise ContestNotLiveError(
            "Answers can only be saved while the contest is live. It is not in the live window right now."
        )

    attempt = ContestAttempt.objects.filter(user=user, contest=contest).first()
    if not attempt:
        raise NotRegisteredError(
            "Start the contest first to create an attempt; we did not find one for your account."
        )

    if attempt.is_submitted:
        raise AlreadySubmittedError(
            "This attempt is already submitted. You cannot change answers anymore."
        )

    if attempt.is_expired:
        raise AttemptExpiredError(
            "The contest time window has ended for your attempt. It has been submitted automatically."
        )

    q_choice = contest_question_choice_type(contest, question_id)
    if q_choice is None:
        raise UnknownContestQuestionError()

    if is_skipped:
        sel: list[int] = []
        effective_skipped = True
    else:
        sel = sorted({int(x) for x in (selected_options or []) if 1 <= int(x) <= 4})
        effective_skipped = len(sel) == 0
        if not effective_skipped and q_choice != "multi" and len(sel) > 1:
            raise MultipleSelectionsNotAllowedError()

    ContestQuestionAttempt.objects.update_or_create(
        contest_attempt=attempt,
        question_id=question_id,
        defaults={
            "selected_options": None if effective_skipped else sel,
            "is_skipped": effective_skipped,
        },
    )

    return {"saved": True}


def submit_attempt(user: User, contest: Contest) -> ContestAttempt:
    attempt = ContestAttempt.objects.filter(user=user, contest=contest).first()
    if not attempt:
        raise NotRegisteredError(
            "We could not find a contest attempt for you. Start the contest before submitting."
        )
    if attempt.is_submitted:
        return attempt
    attempt.submitted_at = timezone.now()
    attempt.save(update_fields=["submitted_at"])
    _invalidate_leaderboard_cache(contest)
    return ContestAttempt.objects.get(pk=attempt.pk)
