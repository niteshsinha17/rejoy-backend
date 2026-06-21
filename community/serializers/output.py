"""
Response serializers — shape the JSON that clients receive.
"""

from rest_framework import serializers

from community.models import Comment, CommentReply, Post, TextPost
from community.pagination import REPLY_PAGE_SIZE


def _serialize_author(obj) -> dict:
    if obj.is_anonymous:
        return {"display_name": "Anonymous", "avatar_url": None, "is_anonymous": True}
    user = obj.user if hasattr(obj, "user") else obj.author
    name = user.get_full_name().strip() or user.username
    return {"display_name": name, "avatar_url": None, "is_anonymous": False}


def _serialize_text_post_content(obj: Post) -> dict:
    try:
        text_data = obj.text_data
        return {"title": text_data.title, "body": text_data.body}
    except TextPost.DoesNotExist:
        return {"title": None, "body": None}


class CommentReplySerializer(serializers.ModelSerializer):
    author_display_name = serializers.SerializerMethodField()
    is_anonymous = serializers.SerializerMethodField()

    class Meta:
        model = CommentReply
        fields = [
            "id",
            "author_display_name",
            "body",
            "is_anonymous",
            "like_count",
            "created_at",
        ]

    def get_author_display_name(self, obj: CommentReply) -> str:
        return _serialize_author(obj)["display_name"]

    def get_is_anonymous(self, obj: CommentReply) -> bool:
        return obj.is_anonymous


class CommentListSerializer(serializers.ModelSerializer):
    author_display_name = serializers.SerializerMethodField()
    is_anonymous = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    reply_count = serializers.IntegerField(read_only=True)
    has_more_replies = serializers.SerializerMethodField()
    replies_next = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "author_display_name",
            "body",
            "is_anonymous",
            "like_count",
            "created_at",
            "replies",
            "reply_count",
            "has_more_replies",
            "replies_next",
        ]

    def get_author_display_name(self, obj: Comment) -> str:
        return _serialize_author(obj)["display_name"]

    def get_is_anonymous(self, obj: Comment) -> bool:
        return obj.is_anonymous

    def get_replies(self, obj: Comment) -> list[dict]:
        prefetched = self.context.get("replies_by_comment_id", {}).get(obj.pk, [])
        page_size = self.context.get("reply_page_size", REPLY_PAGE_SIZE)
        return CommentReplySerializer(
            prefetched[:page_size], many=True, context=self.context
        ).data

    def get_has_more_replies(self, obj: Comment) -> bool:
        return bool(self.context.get("replies_next_by_comment_id", {}).get(obj.pk))

    def get_replies_next(self, obj: Comment) -> str | None:
        return self.context.get("replies_next_by_comment_id", {}).get(obj.pk)


class CommentSerializer(serializers.ModelSerializer):
    author_display_name = serializers.SerializerMethodField()
    is_anonymous = serializers.SerializerMethodField()
    replies = CommentReplySerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "author_display_name",
            "body",
            "is_anonymous",
            "like_count",
            "created_at",
            "replies",
        ]

    def get_author_display_name(self, obj: Comment) -> str:
        return _serialize_author(obj)["display_name"]

    def get_is_anonymous(self, obj: Comment) -> bool:
        return obj.is_anonymous


class FeedItemSerializer(serializers.ModelSerializer):
    """
    Feed list response — nested content by post_type:
    `{ post_type, content: { … }, author, topic, hashtags, … }`
    """

    author = serializers.SerializerMethodField()
    topic = serializers.SerializerMethodField()
    hashtags = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "slug",
            "post_type",
            "author",
            "topic",
            "hashtags",
            "content",
            "like_count",
            "comment_count",
            "liked",
            "created_at",
        ]

    def get_author(self, obj: Post) -> dict:
        return _serialize_author(obj)

    def get_topic(self, obj: Post) -> dict | None:
        topics_by_key = self.context.get("topics_by_key", {})
        return topics_by_key.get((obj.topic_type, obj.topic_id))

    def get_hashtags(self, obj: Post) -> list[str]:
        return list(obj.hashtags.values_list("name", flat=True))

    def get_content(self, obj: Post) -> dict:
        if obj.post_type == "text":
            return _serialize_text_post_content(obj)
        return {}

    def get_liked(self, obj: Post) -> bool:
        request = self.context.get("request")
        if not request or not request.user or not request.user.is_authenticated:
            return False
        return obj.likes.filter(user=request.user).exists()


class PostDetailSerializer(FeedItemSerializer):
    """Same wire shape as feed list items; comments load from `/comments/` separately."""

    pass
