from django.contrib import admin

from community.models import (
    Bookmark,
    Comment,
    CommentLike,
    CommentReply,
    CommentReplyLike,
    Hashtag,
    Post,
    PostLike,
    TextPost,
)


@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


class TextPostInline(admin.StackedInline):
    model = TextPost
    extra = 0


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "pk",
        "slug",
        "post_type",
        "topic_type",
        "topic_id",
        "user",
        "created_at",
    )
    list_filter = ("post_type", "topic_type")
    raw_id_fields = ("user",)
    filter_horizontal = ("hashtags",)
    inlines = [TextPostInline]


class CommentReplyInline(admin.TabularInline):
    model = CommentReply
    extra = 0
    raw_id_fields = ("author",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("pk", "post", "author", "reply_count", "created_at")
    raw_id_fields = ("post", "author")
    inlines = [CommentReplyInline]


@admin.register(CommentReply)
class CommentReplyAdmin(admin.ModelAdmin):
    list_display = ("pk", "comment", "author", "created_at")
    raw_id_fields = ("comment", "author")


@admin.register(PostLike)
class PostLikeAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "created_at")
    raw_id_fields = ("user", "post")


@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ("user", "comment", "created_at")
    raw_id_fields = ("user", "comment")


@admin.register(CommentReplyLike)
class CommentReplyLikeAdmin(admin.ModelAdmin):
    list_display = ("user", "reply", "created_at")
    raw_id_fields = ("user", "reply")


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "created_at")
    raw_id_fields = ("user", "post")
