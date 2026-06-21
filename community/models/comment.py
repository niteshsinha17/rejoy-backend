from django.db import models

from core.models import User
from core.models.base import SoftDeleteBaseModel

from .post import Post


class Comment(SoftDeleteBaseModel):
    """Top-level comment on a post. author NULL ⇒ anonymous."""

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="community_comments",
    )
    body = models.TextField()
    like_count = models.PositiveIntegerField(default=0)
    reply_count = models.PositiveIntegerField(
        default=0,
        help_text="Denormalized count of non-deleted replies.",
    )

    class Meta:
        indexes = [
            models.Index(fields=["post", "-created_at"]),
        ]

    @property
    def is_anonymous(self) -> bool:
        return self.author_id is None

    def __str__(self):
        return self.body[:48]


class CommentReply(SoftDeleteBaseModel):
    """Single reply to a top-level Comment. author NULL ⇒ anonymous."""

    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="replies"
    )
    author = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="community_comment_replies",
    )
    body = models.TextField()
    like_count = models.PositiveIntegerField(default=0)

    class Meta:
        indexes = [
            models.Index(fields=["comment", "-created_at"]),
        ]

    @property
    def is_anonymous(self) -> bool:
        return self.author_id is None

    def __str__(self):
        return self.body[:48]
