from django.utils.text import slugify


def slug_from_name(name: str) -> str:
    """Derive a URL slug from the entity name (no numeric suffixes)."""
    return slugify((name or "").strip())[:255] or "topic"
