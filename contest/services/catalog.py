"""Contest listing and detail (public catalog)."""

from typing import Optional

from django.db.models import DateTimeField, F, Func
from django.utils import timezone

from contest.models import Contest, ContestAttempt, ContestReminderRegistration
from core.models import User


class _ContestWindowEnd(Func):
    """
    SQL: start_time + duration_minutes (same instant as Contest.end_time).

    Django's ``F('x') * timedelta()`` is not supported on SQLite (DatabaseError: Invalid arguments for operator *).
    """

    output_field = DateTimeField()

    def __init__(self, start, minutes, **extra):
        super().__init__(start, minutes, **extra)

    def as_sql(self, compiler, connection, **extra_context):
        start_sql, start_params = compiler.compile(self.source_expressions[0])
        mins_sql, mins_params = compiler.compile(self.source_expressions[1])
        params = list(start_params) + list(mins_params)
        if connection.vendor == "sqlite":
            sql = f"datetime({start_sql}, '+' || CAST({mins_sql} AS TEXT) || ' minutes')"
        elif connection.vendor == "mysql":
            sql = f"DATE_ADD({start_sql}, INTERVAL {mins_sql} MINUTE)"
        elif connection.vendor == "postgresql":
            sql = f"({start_sql} + ({mins_sql} * INTERVAL '1 minute'))"
        else:
            raise NotImplementedError(
                f"Contest window-end SQL not implemented for connection {connection.vendor!r}"
            )
        return sql, params


def _public_contest_queryset():
    """Contests visible on public list endpoints (excludes QA / fixture rows)."""
    return Contest.objects.filter(is_testing=False)


def _contests_with_computed_end():
    """
    Annotate each row with window end = start_time + duration (same as Contest.end_time).
    Used so filters run in SQL instead of loading all rows and calling Contest.status.
    """
    return _public_contest_queryset().annotate(
        _window_end=_ContestWindowEnd(F("start_time"), F("duration_minutes")),
    )


def get_upcoming_or_live() -> list:
    """
    Contests that are upcoming or live (same cases as Contest.status in UPCOMING/LIVE).

    Order (stable for clients that render in API order):
    - Live first: ending soonest first (window end ascending), then older starts as tie-breaker.
    - Then upcoming: starting soonest first (chronological).

    A single ``order_by(-start_time)`` is wrong here: future start_times sort above past ones, so
    upcoming rows would precede live, and among upcoming the farthest date would appear first.
    """
    now = timezone.now()
    base = _contests_with_computed_end()
    live = list(
        base.filter(start_time__lte=now, _window_end__gte=now).order_by(
            "_window_end", "start_time", "id"
        )
    )
    upcoming = list(base.filter(start_time__gt=now).order_by("start_time", "id"))
    return live + upcoming


def get_past() -> list:
    """Ended contests: now past window end (matches Contest.status == ENDED)."""
    now = timezone.now()
    return list(
        _contests_with_computed_end()
        .filter(_window_end__lt=now)
        .order_by("-_window_end", "-start_time", "-id")
    )


def get_detail(slug: str, user: Optional[User] = None) -> dict:
    """Contest by slug plus optional user attempt flags."""
    contest = Contest.objects.get(slug=slug)
    result = {
        "contest": contest,
        "has_started": False,
        "is_submitted": False,
        "reminder_registered": False,
    }
    if user and user.is_authenticated:
        attempt = ContestAttempt.objects.filter(user=user, contest=contest).first()
        if attempt:
            result["has_started"] = True
            result["is_submitted"] = attempt.is_submitted
        result["reminder_registered"] = ContestReminderRegistration.objects.filter(
            user=user,
            contest=contest,
        ).exists()
    return result
