from collections import defaultdict

from core.models import User
from practice.models import QuestionAttempt, UserPracticePlan


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
        user: User,
        course: str,
        subject: str,
        module: str,
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


class PracticePlanService:
    """User ↔ paid practice plan (QBank tier) and expiry. Default free tier is not stored."""

    @staticmethod
    def plan_history_entries(user: User) -> list[dict]:
        """
        Past periods: inactive plan rows (``is_active=False``) plus the active row when it
        is expired (still the designated active line until admin replaces it).
        """
        if not user.is_authenticated:
            return []

        entries: list[dict] = []
        for row in UserPracticePlan.objects.filter(user=user, is_active=False).order_by("-updated_at"):
            ended = row.expires_at if row.expires_at is not None else row.updated_at
            entries.append(
                {
                    "plan": row.plan,
                    "started_at": row.started_at,
                    "expiry": row.expires_at,
                    "is_lifetime": row.is_lifetime,
                    "ended_at": ended,
                    "reason": "inactive",
                }
            )

        active = UserPracticePlan.objects.filter(user=user, is_active=True).first()
        if active and not active.is_active_at():
            ended = active.expires_at if active.expires_at is not None else active.updated_at
            entries.append(
                {
                    "plan": active.plan,
                    "started_at": active.started_at,
                    "expiry": active.expires_at,
                    "is_lifetime": active.is_lifetime,
                    "ended_at": ended,
                    "reason": "expired",
                }
            )

        return sorted(entries, key=lambda e: e["ended_at"], reverse=True)

    @staticmethod
    def get_active_plan_state(user: User) -> dict:
        """
        Active paid line item: ``is_active=True`` and not past ``expires_at`` (unless lifetime).

        ``history`` lists inactive rows and an expired-but-still-active designation row.
        """
        empty: dict = {"plan": None, "expiry": None, "is_lifetime": False, "history": []}
        if not user.is_authenticated:
            return empty

        history = PracticePlanService.plan_history_entries(user)
        row = UserPracticePlan.objects.filter(user=user, is_active=True).first()
        if row is None:
            return {**empty, "history": history}

        if not row.is_active_at():
            return {**empty, "history": history}

        return {
            "plan": row.plan,
            "expiry": row.expires_at,
            "is_lifetime": row.is_lifetime,
            "history": history,
        }
