from collections import defaultdict

from core.models import User
from practice.models import QuestionAttempt


class AttemptService:
    """Service for recording question attempts"""

    @staticmethod
    def record_attempt(
        user: User,
        course: str,
        subject: str,
        module: str,
        question_id: str,
    ) -> QuestionAttempt:
        """
        Record a question attempt. Just marks the question as attempted.
        Does NOT store answer keys - only tracks that user attempted this question.
        """
        attempt, _created = QuestionAttempt.objects.update_or_create(
            user=user,
            course=course,
            subject=subject,
            module=module,
            question_id=question_id,
            defaults={},
        )
        return attempt


class ProgressService:
    """Service for reading raw attempt rows (progress is derived on the client)."""

    @staticmethod
    def get_attempted_by_subject(user: User, course: str, subject: str) -> dict[str, list[str]]:
        """All attempted question IDs for a subject, grouped by module slug."""
        rows = QuestionAttempt.objects.filter(
            user=user, course=course, subject=subject
        ).values_list("module", "question_id")

        by_module: dict[str, list[str]] = defaultdict(list)
        for mod, qid in rows:
            by_module[mod].append(qid)
        return dict(by_module)

    @staticmethod
    def get_attempted_question_ids(
        user: User, course: str, subject: str, module: str
    ) -> dict:
        """
        Get list of attempted question IDs.

        Args:
            user: User instance
            course: Course slug
            subject: Subject slug
            module: Module slug

        Returns:
            Dictionary with question_ids list only (no answer data)
        """
        attempts = QuestionAttempt.objects.filter(
            user=user, course=course, subject=subject, module=module
        )

        question_ids = list(attempts.values_list("question_id", flat=True))

        return {
            "question_ids": question_ids,
        }
