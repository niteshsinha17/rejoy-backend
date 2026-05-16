"""Contest reminder registration (upcoming contests)."""

from contest.exceptions import ContestReminderNotAvailableError
from contest.models import Contest, ContestReminderRegistration, ContestStatus
from core.models import User


def register_reminder(*, user: User, contest: Contest) -> bool:
    """
    Register the user for admin-triggered reminder emails for ``contest``.
    Returns True if a new row was created, False if already registered.
    """
    if contest.status != ContestStatus.UPCOMING:
        raise ContestReminderNotAvailableError(
            "Reminders are only available for upcoming contests."
        )
    _, created = ContestReminderRegistration.objects.get_or_create(
        user=user,
        contest=contest,
    )
    return created


def is_reminder_registered(*, user: User, contest: Contest) -> bool:
    return ContestReminderRegistration.objects.filter(
        user=user,
        contest=contest,
    ).exists()
