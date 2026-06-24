"""HTML reminder emails dispatched from admin-created notification rows."""

from __future__ import annotations

import logging
from django.utils import timezone
from django.utils.formats import date_format

from core.constants import FRONTEND_URL
from core.utils.common import send_html_mail
from contest.models import (
    Contest,
    ContestReminderNotification,
    ContestReminderRegistration,
    ContestStatus,
)
from core.models import User

logger = logging.getLogger(__name__)


def format_starts_in(contest: Contest) -> str:
    delta = contest.start_time - timezone.now()
    if delta.total_seconds() <= 0:
        return "starting soon"
    days = delta.days
    hours, remainder = divmod(delta.seconds, 3600)
    minutes, _ = divmod(remainder, 60)
    parts: list[str] = []
    if days:
        parts.append(f"{days} day{'s' if days != 1 else ''}")
    if hours:
        parts.append(f"{hours} hour{'s' if hours != 1 else ''}")
    if minutes and not days:
        parts.append(f"{minutes} minute{'s' if minutes != 1 else ''}")
    return " ".join(parts) if parts else "less than a minute"


def _contest_detail_url(contest: Contest) -> str:
    base = (FRONTEND_URL or "").rstrip("/")
    path = f"/contests/{contest.slug}"
    return f"{base}{path}" if base else path


def build_reminder_email_html(*, user: User, contest: Contest) -> str:
    greeting_name = (user.first_name or "").strip() or "there"
    starts_in = format_starts_in(contest)
    start_display = date_format(
        timezone.localtime(contest.start_time),
        "DATETIME_FORMAT",
    )
    end_display = date_format(
        timezone.localtime(contest.end_time),
        "DATETIME_FORMAT",
    )
    contest_url = _contest_detail_url(contest)
    marking = contest.get_marking_scheme_display()

    return f"""
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 560px;">
    <p>Hi {greeting_name},</p>
    <p>You registered for a reminder about an upcoming Rejoy Health contest.</p>
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; background: #f8fafc;">
      <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: #0f172a;">{contest.title}</h2>
      <p style="margin: 0 0 12px; font-size: 1.5rem; font-weight: bold; color: #2664eb;">Starts in {starts_in}</p>
      <p style="margin: 0 0 6px;"><strong>Starts:</strong> {start_display}</p>
      <p style="margin: 0 0 6px;"><strong>Ends:</strong> {end_display}</p>
      <p style="margin: 0 0 6px;"><strong>Duration:</strong> {contest.duration_minutes} minutes</p>
      <p style="margin: 0 0 6px;"><strong>Questions:</strong> {contest.total_questions}</p>
      <p style="margin: 0 0 6px;"><strong>Course:</strong> {contest.course}</p>
      <p style="margin: 0;"><strong>Marking:</strong> {marking}</p>
    </div>
    <p style="margin: 24px 0;">
      <a href="{contest_url}"
         style="display: inline-block; background: #2664eb; color: #ffffff; text-decoration: none;
                padding: 12px 24px; border-radius: 999px; font-weight: 600;">
        View contest
      </a>
    </p>
    <p style="font-size: 0.875rem; color: #64748b;">
      Good luck — we hope to see you in the contest.
    </p>
    <p style="margin-top: 24px;">
      Best regards,<br>
      Rejoy Health Support<br>
      <a href="mailto:support@rejoyhealth.com">support@rejoyhealth.com</a>
    </p>
  </body>
</html>"""


class ContestReminderEmailService:
    @staticmethod
    def dispatch(notification: ContestReminderNotification) -> None:
        contest = notification.contest
        if contest.status == ContestStatus.ENDED:
            notification.error_summary = (
                "Contest has already ended; no emails were sent."
            )
            notification.save(update_fields=["error_summary"])
            return

        registrations = ContestReminderRegistration.objects.filter(
            contest=contest,
        ).select_related("user")
        sent = 0
        errors: list[str] = []

        for registration in registrations:
            user = registration.user
            email = (user.email or "").strip()
            if not email:
                errors.append(f"No email for user id {user.pk}")
                continue
            try:
                send_html_mail(
                    subject=f"Reminder: {contest.title} starts soon",
                    message=build_reminder_email_html(user=user, contest=contest),
                    recipient_list=[email],
                )
                sent += 1
            except Exception as exc:
                logger.exception(
                    "Failed contest reminder email to %s", email
                )
                errors.append(f"{email}: {exc}")

        notification.sent_at = timezone.now()
        notification.recipient_count = sent
        if errors:
            notification.error_summary = "; ".join(errors[:20])
            if len(errors) > 20:
                notification.error_summary += f" … and {len(errors) - 20} more"
        notification.save(
            update_fields=["sent_at", "recipient_count", "error_summary"]
        )
