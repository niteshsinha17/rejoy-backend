"""
Input serializers — validate and parse request payloads.
"""

from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework import serializers

from community.constants import COMMENT_BODY_MAX_LENGTH, POST_BODY_MAX_LENGTH
from community.models import TopicType
from community.utils import validate_hashtag


def validate_lexical_post_body(body) -> dict:
    if not isinstance(body, dict):
        raise serializers.ValidationError("Body must be an object with json and text.")
    text = (body.get("text") or "").strip()
    if not text:
        raise serializers.ValidationError("Post body cannot be empty.")
    if len(text) > POST_BODY_MAX_LENGTH:
        raise serializers.ValidationError(
            f"Post body must be at most {POST_BODY_MAX_LENGTH} characters."
        )
    return body


def validate_hashtag_list(tags: list[str]) -> list[str]:
    validated: list[str] = []
    errors: list[str] = []
    for tag in tags:
        try:
            validated.append(validate_hashtag(tag))
        except DjangoValidationError as exc:
            errors.extend(exc.messages)
    if errors:
        raise serializers.ValidationError(errors)
    return validated


class TopicAttachSerializer(serializers.Serializer):
    """Composer picker payload when attaching a topic to a post."""

    topic_type = serializers.ChoiceField(choices=TopicType.values)
    id = serializers.IntegerField(required=False, allow_null=True)
    name = serializers.CharField(
        max_length=255, required=False, allow_blank=True, default=""
    )
    domain = serializers.CharField(
        max_length=255, required=False, allow_blank=True, default=""
    )
    logo_url = serializers.CharField(required=False, allow_blank=True, default="")


class CreateTextPostContentSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=120)
    body = serializers.JSONField()

    def validate_body(self, body):
        return validate_lexical_post_body(body)


class CreatePostSerializer(serializers.Serializer):
    """
    Unified create endpoint — nested body:
    `{ post_type, content: { …type fields }, topic, hashtags? }`
    """

    post_type = serializers.ChoiceField(choices=("text",))
    topic = TopicAttachSerializer()
    hashtags = serializers.ListField(
        child=serializers.CharField(max_length=50), required=False, default=list
    )

    def validate_hashtags(self, tags):
        return validate_hashtag_list(tags)

    def validate(self, attrs):
        raw_content = self.initial_data.get("content")
        if raw_content is None:
            raise serializers.ValidationError({"content": "This field is required."})

        if attrs["post_type"] != "text":
            raise serializers.ValidationError(
                {"post_type": "Only text posts are supported."}
            )

        child = CreateTextPostContentSerializer(data=raw_content)
        child.is_valid(raise_exception=True)

        merged = dict(child.validated_data)
        merged["topic"] = attrs["topic"]
        merged["hashtags"] = attrs.get("hashtags") or []
        attrs["content"] = merged
        return attrs


class AddCommentSerializer(serializers.Serializer):
    body = serializers.CharField(
        max_length=COMMENT_BODY_MAX_LENGTH, trim_whitespace=True
    )


class BookmarkActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=("add", "remove"))
