from django.shortcuts import get_object_or_404
from rest_framework.request import Request

from community.models import Comment, Post
from community.pagination import (
    REPLY_PAGE_SIZE,
    _feed_serializer_context,
    feed_ordering_for_sort,
    paginated_feed_response,
    paginated_post_comments_response,
    paginated_reply_response,
)
from community.serializers import (
    AddCommentSerializer,
    BookmarkActionSerializer,
    CommentListSerializer,
    CommentReplySerializer,
    CreatePostSerializer,
    FeedItemSerializer,
    PostDetailSerializer,
)
from community.services.comment import (
    add_comment,
    add_reply,
    enrich_comments_with_replies,
    replies_queryset,
    top_level_comments_queryset,
)
from community.services.engagement import (
    add_bookmark,
    bookmarked_posts_queryset,
    remove_bookmark,
    toggle_like,
)
from community.services.feed import get_feed_queryset, get_my_posts_queryset
from community.services.post import create_text_post
from community.services.rail import popular_posts_queryset, recent_posts_queryset
from community.services.topic import search_topics
from core.apis import BaseApi, OptionalAuthApi

MY_POSTS_ORDERING = ("-created_at", "-pk")
BOOKMARKS_ORDERING = ("-bookmark_saved_at", "-pk")


class FeedListApi(OptionalAuthApi):
    """GET /community/feed/?sort=popular|latest — popular ranks by comments, then likes."""

    def get(self, request: Request):
        sort = request.query_params.get("sort", "latest")
        search = request.query_params.get("search", "").strip()
        topic = request.query_params.get("topic", "").strip()

        qs = get_feed_queryset(
            sort=sort,
            search=search,
            topic_slug=topic,
        )

        return paginated_feed_response(
            view=self,
            request=request,
            queryset=qs,
            serializer_class=FeedItemSerializer,
            ordering=feed_ordering_for_sort(sort),
        )


class MyPostsListApi(BaseApi):
    """GET /community/posts/mine/ — authenticated user's posts, newest first."""

    def get(self, request: Request):
        qs = get_my_posts_queryset(user=self.get_user())
        return paginated_feed_response(
            view=self,
            request=request,
            queryset=qs,
            serializer_class=FeedItemSerializer,
            ordering=MY_POSTS_ORDERING,
        )


class TopicSearchApi(OptionalAuthApi):
    """GET /community/topics/search/?q= — combined hospital, medical college, and exam search."""

    def get(self, request: Request):
        q = request.query_params.get("q", "")
        return self.get_response_200(search_topics(q))


class RecentPostsRailApi(OptionalAuthApi):
    """GET /community/rail/recent/ — up to 10 newest posts (community sidebar)."""

    def get(self, request: Request):
        qs = list(recent_posts_queryset())
        context = _feed_serializer_context(request=request, posts=qs)
        return self.get_response_200(
            FeedItemSerializer(qs, many=True, context=context).data
        )


class PopularPostsRailApi(OptionalAuthApi):
    """GET /community/rail/popular/ — up to 10 posts ranked by comments, then likes."""

    def get(self, request: Request):
        qs = list(popular_posts_queryset())
        context = _feed_serializer_context(request=request, posts=qs)
        return self.get_response_200(
            FeedItemSerializer(qs, many=True, context=context).data
        )


class PostDetailApi(OptionalAuthApi):
    """GET /community/posts/<post_slug>/"""

    def get(self, request: Request, post_slug: str):
        post = get_object_or_404(Post, slug=post_slug, deleted_at=None)
        context = _feed_serializer_context(request=request, posts=[post])
        return self.get_response_200(PostDetailSerializer(post, context=context).data)


class PostCommentsListApi(OptionalAuthApi):
    """GET /community/posts/<post_slug>/comments/ — paginated top-level comments with first reply page."""

    def get(self, request: Request, post_slug: str):
        post = get_object_or_404(Post, slug=post_slug, deleted_at=None)
        qs = top_level_comments_queryset(post)

        def enrich_comments(request, view, comments):
            return enrich_comments_with_replies(
                request=request,
                view=view,
                comments=comments,
            )

        return paginated_post_comments_response(
            view=self,
            request=request,
            queryset=qs,
            serializer_class=CommentListSerializer,
            enrich_comments=enrich_comments,
        )


class CommentRepliesListApi(OptionalAuthApi):
    """GET /community/comments/<comment_id>/replies/ — paginated replies for a comment."""

    def get(self, request: Request, comment_id: int):
        comment = get_object_or_404(Comment, pk=comment_id, deleted_at=None)
        qs = replies_queryset(comment)
        return paginated_reply_response(
            view=self,
            request=request,
            queryset=qs,
            serializer_class=CommentReplySerializer,
        )


class CreatePostApi(OptionalAuthApi):
    """POST /community/post/create/ — nested body: `{ post_type, content, topic, hashtags? }`."""

    input_serializer_class = CreatePostSerializer

    def post(self, request: Request):
        data = self.validate_input_data()
        content = data["content"]
        user = self.get_user()
        post = create_text_post(user=user, **content)
        context = _feed_serializer_context(request=request, posts=[post])
        return self.get_response_200(FeedItemSerializer(post, context=context).data)


class LikePostApi(BaseApi):
    """POST /community/posts/<post_slug>/like/ — authenticated users only (anonymous cannot like)."""

    def post(self, request: Request, post_slug: str):
        post = get_object_or_404(Post, slug=post_slug, deleted_at=None)
        result = toggle_like(post=post, user=self.get_user())
        return self.get_response_200(result)


class AddCommentApi(OptionalAuthApi):
    """POST /community/posts/<post_slug>/comment/ — signed-out users may comment (anonymous author)."""

    input_serializer_class = AddCommentSerializer

    def post(self, request: Request, post_slug: str):
        post = get_object_or_404(Post, slug=post_slug, deleted_at=None)
        data = self.validate_input_data()
        comment = add_comment(post=post, user=self.get_user(), body=data["body"])
        return self.get_response_200(
            CommentListSerializer(
                comment,
                context={
                    "request": request,
                    "replies_by_comment_id": {comment.pk: []},
                    "replies_next_by_comment_id": {},
                    "reply_page_size": REPLY_PAGE_SIZE,
                },
            ).data
        )


class AddCommentReplyApi(OptionalAuthApi):
    """POST /community/comments/<comment_id>/reply/ — signed-out users may reply (anonymous author)."""

    input_serializer_class = AddCommentSerializer

    def post(self, request: Request, comment_id: int):
        comment = get_object_or_404(Comment, pk=comment_id, deleted_at=None)
        data = self.validate_input_data()
        reply = add_reply(comment=comment, user=self.get_user(), body=data["body"])
        return self.get_response_200(
            CommentReplySerializer(reply, context={"request": request}).data
        )


class BookmarksListApi(BaseApi):
    """GET /community/bookmarks/ — signed-in user's saved posts."""

    def get(self, request: Request):
        qs = bookmarked_posts_queryset(user=self.get_user())
        return paginated_feed_response(
            view=self,
            request=request,
            queryset=qs,
            serializer_class=FeedItemSerializer,
            ordering=BOOKMARKS_ORDERING,
        )


class BookmarkToggleApi(BaseApi):
    """POST /community/posts/<post_slug>/bookmark/ — body: `{ "action": "add" | "remove" }`."""

    input_serializer_class = BookmarkActionSerializer

    def post(self, request: Request, post_slug: str):
        post = get_object_or_404(Post, slug=post_slug, deleted_at=None)
        data = self.validate_input_data()
        if data["action"] == "add":
            result = add_bookmark(post=post, user=self.get_user())
        else:
            result = remove_bookmark(post=post, user=self.get_user())
        return self.get_response_200(result)
