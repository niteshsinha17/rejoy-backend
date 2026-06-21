import hashlib
import re
from typing import Any
from urllib.parse import unquote

from django.core.exceptions import ValidationError
from django.utils.text import slugify

HASHTAG_PATTERN = re.compile(r"^[a-z0-9_]+$")


def validate_hashtag(raw: str) -> str:
    """Normalize and validate a hashtag for storage (lowercase alphanumeric + underscore)."""
    name = (raw or "").strip().lower()
    if name.startswith("#"):
        name = name[1:].strip()
    if not name:
        raise ValidationError("Hashtag cannot be empty.")
    if " " in name or not HASHTAG_PATTERN.fullmatch(name):
        raise ValidationError(
            "Hashtag must contain only letters, numbers, and underscores."
        )
    if len(name) > 50:
        raise ValidationError("Hashtag must be at most 50 characters.")
    return name


def _post_pk_hash_suffix(post_pk: int, length: int = 12) -> str:
    """Stable hex suffix derived from PK (not reversible to id without brute force)."""
    return hashlib.sha256(f"rejoy.community.post:{post_pk}".encode()).hexdigest()[
        :length
    ]


def build_post_public_slug(source: str, post_pk: int) -> str:
    """URL-safe segment: slugified title + hash of primary key."""
    base = slugify((source or "").strip())[:70].strip("-") or "post"
    suffix = _post_pk_hash_suffix(post_pk)
    return f"{base}-{suffix}"[:180]


def author_from_request_user(user: Any):
    """
    Map DRF request.user to a persisted author FK, or None when the client is
    unauthenticated (treated as anonymous author on posts/comments).
    """
    if user is None:
        return None
    if getattr(user, "is_authenticated", False):
        return user
    return None


def normalize_hashtag_query(value: str) -> str:
    """Lowercase search term for hashtag matching; strips leading # and spaces."""
    s = unquote((value or "").strip()).lower()
    if s.startswith("#"):
        s = s[1:].strip()
    s = s.replace(" ", "")
    if s and not HASHTAG_PATTERN.fullmatch(s):
        return ""
    return s
