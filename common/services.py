"""Backward-compatible re-exports. Prefer ``core.services.email_service`` in new code."""

from core.services.email_service import EmailService

__all__ = ["EmailService"]
