"""Backward-compatible re-exports. Prefer ``core.utils.hash`` in new code."""

from core.utils.hash import HashIdConverter

__all__ = ["HashIdConverter"]
