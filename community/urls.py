from django.urls import path

from community.apis import (
    AddCommentApi,
    AddCommentReplyApi,
    BookmarkToggleApi,
    BookmarksListApi,
    CommentRepliesListApi,
    CreatePostApi,
    FeedListApi,
    LikePostApi,
    PopularPostsRailApi,
    MyPostsListApi,
    PostCommentsListApi,
    PostDetailApi,
    RecentPostsRailApi,
    TopicSearchApi,
)

urlpatterns = [
    path("feed/", FeedListApi.as_view(), name="community-feed"),
    path("topics/search/", TopicSearchApi.as_view(), name="community-topics-search"),
    path("rail/recent/", RecentPostsRailApi.as_view(), name="community-rail-recent"),
    path("rail/popular/", PopularPostsRailApi.as_view(), name="community-rail-popular"),
    path("post/create/", CreatePostApi.as_view(), name="community-create-post"),
    path("bookmarks/", BookmarksListApi.as_view(), name="community-bookmarks"),
    path("posts/mine/", MyPostsListApi.as_view(), name="community-my-posts"),
    path(
        "posts/<slug:post_slug>/comments/",
        PostCommentsListApi.as_view(),
        name="community-post-comments",
    ),
    path(
        "posts/<slug:post_slug>/", PostDetailApi.as_view(), name="community-post-detail"
    ),
    path(
        "posts/<slug:post_slug>/like/",
        LikePostApi.as_view(),
        name="community-like-post",
    ),
    path(
        "posts/<slug:post_slug>/comment/",
        AddCommentApi.as_view(),
        name="community-add-comment",
    ),
    path(
        "posts/<slug:post_slug>/bookmark/",
        BookmarkToggleApi.as_view(),
        name="community-bookmark",
    ),
    path(
        "comments/<str:comment_id>/replies/",
        CommentRepliesListApi.as_view(),
        name="community-comment-replies",
    ),
    path(
        "comments/<str:comment_id>/reply/",
        AddCommentReplyApi.as_view(),
        name="community-add-reply",
    ),
]
