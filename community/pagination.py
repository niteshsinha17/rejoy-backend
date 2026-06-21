from collections.abc import Callable
from typing import Any
from urllib.parse import parse_qs, urlparse

from django.db.models import QuerySet
from rest_framework.pagination import CursorPagination
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from community.models import Comment, Post
from community.services.rail import POPULAR_POST_ORDERING
from community.services.topic import batch_fetch_topics

COMMENT_PAGE_SIZE = 20
REPLY_PAGE_SIZE = 5


class FeedCursorPagination(CursorPagination):
    page_size = 15
    page_size_query_param = "page_size"
    min_page_size = 15
    max_page_size = 50
    ordering = "-created_at"

    def get_page_size(self, request):
        if self.page_size_query_param:
            try:
                requested = int(request.query_params[self.page_size_query_param])
                return max(self.min_page_size, min(requested, self.max_page_size))
            except (KeyError, ValueError):
                pass
        return self.page_size


class CommentCursorPagination(CursorPagination):
    page_size = COMMENT_PAGE_SIZE
    page_size_query_param = "page_size"
    min_page_size = 10
    max_page_size = 50
    ordering = ("-created_at", "-pk")


class ReplyCursorPagination(CursorPagination):
    page_size = REPLY_PAGE_SIZE
    page_size_query_param = "page_size"
    min_page_size = 5
    max_page_size = 30
    ordering = ("-created_at", "-pk")

    def get_page_size(self, request):
        if self.page_size_query_param:
            try:
                requested = int(request.query_params[self.page_size_query_param])
                return max(self.min_page_size, min(requested, self.max_page_size))
            except (KeyError, ValueError):
                pass
        return self.page_size


def cursor_from_paginated_next(next_link: str | None) -> str | None:
    if not next_link:
        return None
    parsed = urlparse(next_link)
    values = parse_qs(parsed.query).get("cursor")
    return values[0] if values else None


def feed_ordering_for_sort(sort: str) -> tuple[str, ...]:
    if sort == "popular":
        return (*POPULAR_POST_ORDERING, "-pk")
    return ("-created_at", "-pk")


def _feed_serializer_context(request: Request, posts: list[Post]) -> dict[str, Any]:
    topics = batch_fetch_topics(posts or [])
    return {
        "request": request,
        "topics_by_key": topics,
    }


def paginated_feed_response(
    view: APIView,
    request: Request,
    queryset: QuerySet[Post],
    serializer_class: type[Serializer],
    ordering: tuple[str, ...],
) -> Response:
    paginator = FeedCursorPagination()
    paginator.ordering = ordering
    page = paginator.paginate_queryset(queryset, request, view=view)
    context = _feed_serializer_context(request=request, posts=page)
    data = serializer_class(page, many=True, context=context).data
    return paginator.get_paginated_response(data)


def paginated_post_comments_response(
    view: APIView,
    request: Request,
    queryset: QuerySet[Comment],
    serializer_class: type[Serializer],
    enrich_comments: Callable[[Request, APIView, list[Comment]], dict],
) -> Response:
    paginator = CommentCursorPagination()
    page = paginator.paginate_queryset(queryset, request, view=view)
    if not page:
        return paginator.get_paginated_response([])

    extra_context = enrich_comments(request=request, view=view, comments=list(page))
    context = {"request": request, **extra_context}
    data = serializer_class(page, many=True, context=context).data
    return paginator.get_paginated_response(data)


def paginated_reply_response(
    view: APIView,
    request: Request,
    queryset: QuerySet,
    serializer_class: type[Serializer],
) -> Response:
    paginator = ReplyCursorPagination()
    page = paginator.paginate_queryset(queryset, request, view=view)
    data = serializer_class(page, many=True, context={"request": request}).data
    return paginator.get_paginated_response(data)
