"""Backward-compatible re-exports. Prefer ``core.models.base`` in new code."""

from core.models.base import SoftDeleteBaseModel, TimeStampBaseModel

__all__ = ["SoftDeleteBaseModel", "TimeStampBaseModel"]
