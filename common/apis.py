"""Backward-compatible re-exports. Prefer ``core.apis`` in new code."""

from core.apis.base import BaseApi, OpenApi, OptionalAuthApi

__all__ = ["BaseApi", "OpenApi", "OptionalAuthApi"]
