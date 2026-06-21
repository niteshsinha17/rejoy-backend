from django.db import models

from core.models import User

from .comment import Comment, CommentReply
from .post import Post


class PostLike(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="community_post_likes"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "post"], name="uniq_community_post_like"
            ),
        ]


class CommentLike(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="community_comment_likes"
    )
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "comment"], name="uniq_community_comment_like"
            ),
        ]


class CommentReplyLike(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="community_reply_likes"
    )
    reply = models.ForeignKey(
        CommentReply, on_delete=models.CASCADE, related_name="likes"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "reply"], name="uniq_community_reply_like"
            ),
        ]
