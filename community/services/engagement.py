from django.db.models import F, QuerySet
from django.utils import timezone

from core.models import User
from community.models import Bookmark, Post, PostLike


def toggle_like(post: Post, user: User) -> dict:
    like, created = PostLike.objects.get_or_create(user=user, post=post)
    if created:
        Post.objects.filter(pk=post.pk).update(like_count=F("like_count") + 1)
    else:
        like.delete()
        Post.objects.filter(pk=post.pk).update(like_count=max(0, post.like_count - 1))

    post.refresh_from_db()
    return {"liked": created, "like_count": post.like_count}


def add_bookmark(post: Post, user: User) -> dict:
    bookmark, created = Bookmark.objects.get_or_create(user=user, post=post)
    if not created:
        Bookmark.objects.filter(pk=bookmark.pk).update(created_at=timezone.now())
    return {"bookmarked": True, "created": created}


def remove_bookmark(post: Post, user: User) -> dict:
    Bookmark.objects.filter(user=user, post=post).delete()
    return {"bookmarked": False}


def bookmarked_posts_queryset(user: User) -> QuerySet[Post]:
    """Posts saved by the user, newest bookmark first (annotated for cursor pagination)."""
    return (
        Post.objects.prefetch_related("hashtags")
        .filter(deleted_at=None, bookmarks__user=user)
        .annotate(bookmark_saved_at=F("bookmarks__created_at"))
        .order_by("-bookmark_saved_at", "-pk")
    )
