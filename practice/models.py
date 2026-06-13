from datetime import timedelta

from django.db import models
from django.utils import timezone

from common.mixin import CreatedModalMixin, UpdatedModalMixin
from core.models import User


class PracticePlan(models.TextChoices):
    """Paid NEET PG QBank tiers only. No row / no plan in API means default free tier."""

    MONTHLY = "monthly", "Pro monthly"
    ANNUAL = "annual", "Pro annual"
    LIFETIME = "lifetime", "Lifetime"


def default_expires_at_for_plan(plan: str, *, from_time=None):
    """
    ``expires_at`` from a reference moment (usually ``UserPracticePlan.started_at``).

    Monthly → +30 days, annual → +365 days, lifetime → ``None`` (no expiry).
    """
    if from_time is None:
        from_time = timezone.now()
    if plan == PracticePlan.LIFETIME:
        return None
    if plan == PracticePlan.MONTHLY:
        return from_time + timedelta(days=30)
    if plan == PracticePlan.ANNUAL:
        return from_time + timedelta(days=365)
    return None


class UserPracticePlan(CreatedModalMixin, UpdatedModalMixin):
    """
    Paid practice / QBank subscription line items. A user may have many rows; at most one
    should have ``is_active=True`` (enforced in ``save()`` by deactivating other rows).

    Rows with ``is_active=False`` are historical periods (superseded when a new row was
    added and marked active, or toggled inactive in admin). Edits to an existing row do
    not create new rows.

    Absence of any active row (or active row expired for access) → API treats as free tier.
    """

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="practice_plans",
        db_index=True,
    )
    plan = models.CharField(max_length=32, choices=PracticePlan.choices, db_index=True)
    started_at = models.DateTimeField(
        default=timezone.now,
        help_text="When the paid period starts. Expiry is computed from this and the plan when saved.",
    )
    expires_at = models.DateTimeField(
        null=True,
        blank=True,
        editable=False,
        help_text="Computed from Started at and plan when the row is saved. Not editable.",
    )
    is_lifetime = models.BooleanField(
        default=False,
        editable=False,
        db_index=True,
        help_text="Set automatically from plan (true only for lifetime). Not editable.",
    )
    is_active = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Exactly one row per user may be active. Saving with active=True deactivates other rows for this user.",
    )

    class Meta:
        indexes = [
            models.Index(fields=["expires_at"]),
            models.Index(fields=["user", "is_active"]),
        ]

    def __str__(self):
        return f"{self.user_id} {self.plan} active={self.is_active}"

    def save(self, *args, **kwargs):
        self.is_lifetime = self.plan == PracticePlan.LIFETIME
        if self.started_at is None:
            self.started_at = timezone.now()
        self.expires_at = default_expires_at_for_plan(self.plan, from_time=self.started_at)

        if self.is_active:
            uid = self.user_id
            if uid is None and getattr(self, "user", None) is not None:
                uid = getattr(self.user, "pk", None)
            if uid is not None:
                others = UserPracticePlan.objects.filter(user_id=uid, is_active=True)
                if self.pk:
                    others = others.exclude(pk=self.pk)
                others.update(is_active=False)

        super().save(*args, **kwargs)

    def is_active_at(self, at=None):
        """Paid access is active if not expired; null expiry never expires."""
        if self.expires_at is None:
            return True
        moment = at if at is not None else timezone.now()
        return self.expires_at > moment


class QuestionAttempt(CreatedModalMixin, UpdatedModalMixin):
    """
    Tracks which questions a user has attempted.
    Does NOT store answers - only tracks attempt status for analytics.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    course = models.CharField(max_length=50, db_index=True)  # 'neet-pg', 'usmle'
    subject = models.CharField(max_length=100, db_index=True)  # 'anaesthesia', 'anatomy'
    module = models.CharField(max_length=100, db_index=True)  # 'airway', 'general-anaesthesia'
    question_id = models.CharField(max_length=100)  # from JSON "id" field

    class Meta:
        unique_together = [['user', 'course', 'subject', 'module', 'question_id']]
        indexes = [
            models.Index(fields=['user', 'course']),
            models.Index(fields=['user', 'subject']),
            models.Index(fields=['user', 'module']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.course}/{self.subject}/{self.module}/{self.question_id}"
