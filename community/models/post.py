from django.core.exceptions import ValidationError
from django.db import models

from core.models import User
from core.models.base import SoftDeleteBaseModel

from community.utils import validate_hashtag

from .choices import PostType, TopicType


class Hashtag(models.Model):
    """One row per lowercase tag. Use get_or_create when attaching to a post."""

    name = models.CharField(max_length=50, unique=True, db_index=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        self.name = validate_hashtag(self.name)

    def __str__(self):
        return f"#{self.name}"


class Post(SoftDeleteBaseModel):
    """
    Central feed row. user NULL ⇒ anonymous post.

    Type-specific payload lives in related tables (e.g. TextPost via text_data).
    Topic is polymorphic: topic_type + topic_id (see docs/business_logic.md).

    Engagement counters are denormalized here for fast feed queries;
    update them in the service layer when likes or comments change.
    """

    post_type = models.CharField(max_length=10, choices=PostType.choices, db_index=True)
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="community_posts",
    )
    hashtags = models.ManyToManyField(
        "community.Hashtag", related_name="posts", blank=True
    )
    topic_type = models.CharField(
        max_length=20, choices=TopicType.choices, db_index=True
    )
    topic_id = models.PositiveIntegerField(db_index=True)

    like_count = models.PositiveIntegerField(default=0)
    comment_count = models.PositiveIntegerField(
        default=0,
        help_text="Top-level comments only; replies are not included.",
    )
    slug = models.CharField(max_length=180, unique=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=["-created_at"]),
            models.Index(fields=["post_type", "-created_at"]),
            models.Index(fields=["topic_type", "topic_id"]),
        ]

    @property
    def is_anonymous(self) -> bool:
        return self.user_id is None

    def __str__(self):
        return f"{self.post_type} {self.slug or self.pk}"


class TextPost(models.Model):
    """Rich-text / plain-text post. body stored as Lexical editor JSON."""

    post = models.OneToOneField(
        Post, on_delete=models.CASCADE, related_name="text_data"
    )
    title = models.CharField(max_length=120)
    body = models.JSONField()

    def clean(self):
        super().clean()
        if not self.body:
            raise ValidationError({"body": "Post body is required."})

    def __str__(self):
        return self.title
