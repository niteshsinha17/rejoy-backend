from django.db.models import F, QuerySet

from core.models import User
from community.models import Comment, CommentReply, Post
from community.pagination import (
    REPLY_PAGE_SIZE,
    ReplyCursorPagination,
    cursor_from_paginated_next,
)
from community.utils import author_from_request_user


def _request_ignoring_page_size(request):
    """Comment list requests pass `page_size` for comments; do not apply it to reply pages."""
    if "page_size" not in request.query_params:
        return request
    query_params = request.query_params.copy()
    del query_params["page_size"]

    class _Proxy:
        __slots__ = ("_request", "query_params", "GET")

        def __init__(self, inner, params):
            self._request = inner
            self.query_params = params
            self.GET = params

        def __getattr__(self, name):
            return getattr(self._request, name)

    return _Proxy(request, query_params)


def top_level_comments_queryset(post: Post) -> QuerySet[Comment]:
    """Top-level comments (not soft-deleted), ordered newest-first."""
    return (
        post.comments.filter(deleted_at=None)
        .select_related("author")
        .order_by("-created_at", "-id")
    )


def replies_queryset(comment: Comment) -> QuerySet[CommentReply]:
    """Replies for a comment (not soft-deleted), ordered newest-first."""
    return (
        comment.replies.filter(deleted_at=None)
        .select_related("author")
        .order_by("-created_at", "-id")
    )


def first_replies_page(
    request, view, comment: Comment, page_size: int = REPLY_PAGE_SIZE
):
    paginator = ReplyCursorPagination()
    paginator.page_size = page_size
    reply_request = _request_ignoring_page_size(request)
    page = paginator.paginate_queryset(
        replies_queryset(comment), reply_request, view=view
    )
    if page is None:
        page = []
    else:
        page = list(page)[:page_size]
    next_cursor = cursor_from_paginated_next(paginator.get_next_link())
    return page, next_cursor


def enrich_comments_with_replies(
    request,
    view,
    comments: list[Comment],
    reply_page_size: int = REPLY_PAGE_SIZE,
) -> dict:
    replies_by_comment_id: dict[int, list[CommentReply]] = {}
    replies_next_by_comment_id: dict[int, str] = {}

    for comment in comments:
        page, next_cursor = first_replies_page(
            request=request,
            view=view,
            comment=comment,
            page_size=reply_page_size,
        )
        replies_by_comment_id[comment.pk] = page
        if next_cursor:
            replies_next_by_comment_id[comment.pk] = next_cursor

    return {
        "replies_by_comment_id": replies_by_comment_id,
        "replies_next_by_comment_id": replies_next_by_comment_id,
        "reply_page_size": reply_page_size,
    }


def add_comment(post: Post, user: User, body: str) -> Comment:
    author = author_from_request_user(user)
    comment = Comment.objects.create(
        post=post,
        author=author,
        body=body,
    )
    Post.objects.filter(pk=post.pk).update(comment_count=F("comment_count") + 1)
    return comment


def add_reply(comment: Comment, user: User, body: str) -> CommentReply:
    author = author_from_request_user(user)
    reply = CommentReply.objects.create(
        comment=comment,
        author=author,
        body=body,
    )
    Comment.objects.filter(pk=comment.pk).update(reply_count=F("reply_count") + 1)
    return reply
