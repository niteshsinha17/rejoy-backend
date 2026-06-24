"""Backward-compatible re-exports. Prefer ``core.mixin`` in new code."""

from core.mixin import CreatedModalMixin, DeletedModalMixin, UpdatedModalMixin

__all__ = ["CreatedModalMixin", "DeletedModalMixin", "UpdatedModalMixin"]
