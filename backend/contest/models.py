import logging

from django.db import models
from django.utils import timezone

logger = logging.getLogger(__name__)

from common.mixin import CreatedModalMixin, UpdatedModalMixin
from core.models import User


class MarkingScheme(models.TextChoices):
    NEET_PG = "neet_pg", "NEET PG (+4 correct / -1 incorrect / 0 skipped)"
    USMLE = "usmle", "USMLE (+1 correct / 0 incorrect / 0 skipped)"
    POSITIVE_ONLY = (
        "positive_only",
        "Positive Only (+1 correct / 0 incorrect / 0 skipped)",
    )


class ContestStatus(models.TextChoices):
    UPCOMING = "upcoming", "Upcoming"
    LIVE = "live", "Live"
    ENDED = "ended", "Ended"


class Contest(CreatedModalMixin, UpdatedModalMixin):
    slug = models.SlugField(unique=True, max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    course = models.CharField(max_length=50)  # e.g. 'neet-pg', 'usmle'
    start_time = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField()
    qb_url = models.URLField(max_length=500)
    questions_json = models.JSONField(
        null=True, blank=True
    )  # cached from qb_url on admin save
    total_questions = models.PositiveIntegerField(default=0)
    marking_scheme = models.CharField(
        max_length=20,
        choices=MarkingScheme.choices,
        default=MarkingScheme.NEET_PG,
    )
    # question_id (str) -> sorted list of correct option indices 1–4
    answer_key_json = models.JSONField(default=dict, blank=True)
    leaderboard_cache_payload = models.JSONField(default=list, blank=True)
    leaderboard_cache_computed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-start_time"]

    def __str__(self):
        return self.title

    @property
    def end_time(self):
        return self.start_time + timezone.timedelta(minutes=self.duration_minutes)

    @property
    def status(self) -> str:
        now = timezone.now()
        if now < self.start_time:
            return ContestStatus.UPCOMING
        if now <= self.end_time:
            return ContestStatus.LIVE
        return ContestStatus.ENDED

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class ContestAttempt(CreatedModalMixin, UpdatedModalMixin):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="contest_attempts"
    )
    contest = models.ForeignKey(
        Contest, on_delete=models.CASCADE, related_name="attempts"
    )
    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = [["user", "contest"]]

    def __str__(self):
        return f"{self.user.username} – {self.contest.title}"

    @property
    def is_submitted(self) -> bool:
        return self.submitted_at is not None

    @property
    def deadline(self):
        # Timer is the full contest window; cap at end_time for any late starters
        return self.contest.end_time

    @property
    def is_expired(self) -> bool:
        return timezone.now() > self.deadline


class ContestQuestionAttempt(CreatedModalMixin):
    contest_attempt = models.ForeignKey(
        ContestAttempt, on_delete=models.CASCADE, related_name="answers"
    )
    question_id = models.CharField(max_length=100)
    selected_options = models.JSONField(null=True, blank=True)  # list[int] 1–4; MCQ single/multi
    is_skipped = models.BooleanField(default=False)

    class Meta:
        unique_together = [["contest_attempt", "question_id"]]
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.contest_attempt} – Q{self.question_id}"
