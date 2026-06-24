from django.db import models

from core.models import User

from .post import Post


class Bookmark(models.Model):
    """Per-user saved community posts."""

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="community_bookmarks"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="bookmarks")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "post"], name="uniq_community_bookmark"
            ),
        ]
