from django.db.models import QuerySet

from community.models import Post

RAIL_POST_LIMIT = 10

POPULAR_POST_ORDERING = ("-comment_count", "-like_count", "-created_at")


def recent_posts_queryset() -> QuerySet[Post]:
    """Newest posts first (sidebar / rail)."""
    return (
        Post.objects.prefetch_related("hashtags")
        .filter(deleted_at=None)
        .order_by("-created_at")[:RAIL_POST_LIMIT]
    )


def popular_posts_queryset() -> QuerySet[Post]:
    """Posts ranked by discussion, then likes."""
    return (
        Post.objects.prefetch_related("hashtags")
        .filter(deleted_at=None)
        .order_by(*POPULAR_POST_ORDERING)[:RAIL_POST_LIMIT]
    )
