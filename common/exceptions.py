"""Backward-compatible re-exports. Prefer ``core.exceptions`` in new code."""

from core.exceptions import BaseValidationError

__all__ = ["BaseValidationError"]
