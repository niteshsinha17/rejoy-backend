"""Backward-compatible re-exports. Prefer ``core.authentication`` in new code."""

from core.authentication import LenientTokenAuthentication

__all__ = ["LenientTokenAuthentication"]
