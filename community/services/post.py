import uuid
from typing import Any

from django.core.exceptions import ValidationError
from django.db import transaction

from community.models import Hashtag, Post, TextPost
from community.services.topic import resolve_topic_for_post
from community.utils import (
    author_from_request_user,
    build_post_public_slug,
    validate_hashtag,
)


def _attach_hashtags(post: Post, raw_tags: list[str]) -> None:
    for tag in raw_tags:
        try:
            name = validate_hashtag(tag)
        except ValidationError as exc:
            raise ValidationError({"hashtags": exc.messages}) from exc
        hashtag, _ = Hashtag.objects.get_or_create(name=name)
        post.hashtags.add(hashtag)


def create_text_post(
    user: Any,
    title: str,
    body: dict,
    topic: dict,
    hashtags: list[str] | None = None,
) -> Post:
    topic_type, topic_id = resolve_topic_for_post(topic_payload=topic)
    author = author_from_request_user(user)

    with transaction.atomic():
        placeholder = f"p-{uuid.uuid4().hex}"[:180]
        post = Post.objects.create(
            post_type="text",
            user=author,
            topic_type=topic_type,
            topic_id=topic_id,
            slug=placeholder,
        )
        TextPost.objects.create(post=post, title=title, body=body)
        _attach_hashtags(post, hashtags or [])
        final_slug = build_post_public_slug(title, post_pk=post.pk)
        Post.objects.filter(pk=post.pk).update(slug=final_slug)
        post.slug = final_slug

    return post
