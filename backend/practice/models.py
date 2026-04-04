from django.db import models

from common.mixin import CreatedModalMixin, UpdatedModalMixin
from core.models import User


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
