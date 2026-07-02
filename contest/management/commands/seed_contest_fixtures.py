"""
Load repeatable contest fixtures for local / QA testing.

Deletes prior fixture contests (hardcoded slugs) and fixture users, then recreates:
- one upcoming, one live, one ended (empty leaderboard), one ended (~55 ranks for scoreboard pagination), many past (pagination).

Question set: https://pub-e11fe97f208646e382b1689861e67655.r2.dev/anaesthesia/airway.json

Usage:
    python manage.py seed_contest_fixtures
"""

from __future__ import annotations

import requests
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from contest.models import Contest, ContestAttempt, ContestQuestionAttempt, MarkingScheme
from contest.schemas import parse_contest_questions_json
from contest.services.answer_key import generate_results
from core.models import User

QUESTIONS_JSON_URL = (
    "https://pub-e11fe97f208646e382b1689861e67655.r2.dev/anaesthesia/airway.json"
)

# All fixture contests use slugs from this set so reruns are idempotent.
FIXTURE_SLUG_UPCOMING = "fixture-upcoming"
FIXTURE_SLUG_LIVE = "fixture-live"
FIXTURE_SLUG_ENDED_EMPTY = "fixture-ended-empty"
FIXTURE_SLUG_LEADERBOARD = "fixture-ended-leaderboard"
FIXTURE_PAST_SLUGS = [f"fixture-past-{i:02d}" for i in range(1, 13)]

ALL_CONTEST_SLUGS = [
    FIXTURE_SLUG_UPCOMING,
    FIXTURE_SLUG_LIVE,
    FIXTURE_SLUG_ENDED_EMPTY,
    FIXTURE_SLUG_LEADERBOARD,
    *FIXTURE_PAST_SLUGS,
]

FIXTURE_USER_USERNAME_PREFIX = "fixture_contest_user_"
LEADERBOARD_USER_COUNT = 55
LIVE_CONTEST_USER_COUNT = 6


def _fetch_questions_payload(url: str) -> tuple[list[dict], dict[str, list[int]]]:
    response = requests.get(url, timeout=60)
    response.raise_for_status()
    data = response.json()
    records = parse_contest_questions_json(data)
    questions = [r.model_dump(mode="python") for r in records]
    answer_key = {str(r.id): r.cop for r in records}
    return questions, answer_key


class Command(BaseCommand):
    help = "Delete and recreate contest fixtures (hardcoded slugs) for testing."

    @transaction.atomic
    def handle(self, *args, **options):
        deleted_c, _ = Contest.objects.filter(slug__in=ALL_CONTEST_SLUGS).delete()
        deleted_u, _ = User.objects.filter(
            username__startswith=FIXTURE_USER_USERNAME_PREFIX,
        ).delete()
        self.stdout.write(
            self.style.WARNING(
                f"Removed {deleted_c} fixture contest row(s) and {deleted_u} fixture user(s)."
            )
        )

        questions, answer_key = _fetch_questions_payload(QUESTIONS_JSON_URL)
        total = len(questions)

        now = timezone.now()

        def create_contest(
            *,
            slug: str,
            title: str,
            start_time,
            duration_minutes: int,
        ) -> Contest:
            return Contest.objects.create(
                slug=slug,
                title=title,
                description=f"Auto fixture · {title}",
                course="neet-pg",
                start_time=start_time,
                duration_minutes=duration_minutes,
                qb_url=QUESTIONS_JSON_URL,
                questions_json=questions,
                total_questions=total,
                marking_scheme=MarkingScheme.NEET_PG,
                answer_key_json=answer_key,
                is_testing=True,
            )

        create_contest(
            slug=FIXTURE_SLUG_UPCOMING,
            title="Fixture — Upcoming contest",
            start_time=now + timezone.timedelta(days=3),
            duration_minutes=120,
        )
        create_contest(
            slug=FIXTURE_SLUG_LIVE,
            title="Fixture — Live contest",
            start_time=now - timezone.timedelta(minutes=45),
            duration_minutes=240,
        )
        create_contest(
            slug=FIXTURE_SLUG_ENDED_EMPTY,
            title="Fixture — Ended (no attempts)",
            start_time=now - timezone.timedelta(days=5),
            duration_minutes=90,
        )

        lb_contest = create_contest(
            slug=FIXTURE_SLUG_LEADERBOARD,
            title="Fixture — Ended (paginated leaderboard)",
            start_time=now - timezone.timedelta(days=10),
            duration_minutes=120,
        )

        for i, slug in enumerate(FIXTURE_PAST_SLUGS, start=1):
            create_contest(
                slug=slug,
                title=f"Fixture — Past page seed {i:02d}",
                start_time=now - timezone.timedelta(days=30 + i),
                duration_minutes=60,
            )

        qids = [str(q["id"]) for q in questions]

        def create_fixture_users(count: int) -> list[User]:
            users: list[User] = []
            for n in range(1, count + 1):
                username = f"{FIXTURE_USER_USERNAME_PREFIX}{n:03d}"
                users.append(
                    User.objects.create_user(
                        username=username,
                        email=f"{username}@fixture.example.test",
                        password="fixture-test-pass-123",
                        first_name="Fixture",
                        last_name=f"Player{n}",
                    )
                )
            return users

        # One username pool: first N join live; all submit leaderboard contest.
        all_fixture_users = create_fixture_users(LEADERBOARD_USER_COUNT)
        live_users = all_fixture_users[:LIVE_CONTEST_USER_COUNT]

        live = Contest.objects.get(slug=FIXTURE_SLUG_LIVE)
        for idx, user in enumerate(live_users):
            attempt = ContestAttempt.objects.create(user=user, contest=live)
            for j, qid in enumerate(qids):
                key = answer_key[qid]
                if (idx + j) % 5 == 0:
                    wrong = 2 if key == [1] else 1
                    sel = [wrong]
                else:
                    sel = list(key)
                ContestQuestionAttempt.objects.create(
                    contest_attempt=attempt,
                    question_id=qid,
                    selected_options=sel,
                    is_skipped=False,
                )
            attempt.submitted_at = now - timezone.timedelta(minutes=20 - idx)
            attempt.save(update_fields=["submitted_at"])

        for idx, user in enumerate(all_fixture_users):
            attempt = ContestAttempt.objects.create(user=user, contest=lb_contest)
            n_correct_target = max(0, total - idx)
            for j, qid in enumerate(qids):
                key = list(answer_key[qid])
                if j < n_correct_target:
                    sel = key
                else:
                    wrong_opt = 2 if key != [2] else 3
                    sel = [wrong_opt]
                ContestQuestionAttempt.objects.create(
                    contest_attempt=attempt,
                    question_id=qid,
                    selected_options=sel,
                    is_skipped=False,
                )
            attempt.submitted_at = now - timezone.timedelta(days=2, seconds=idx)
            attempt.save(update_fields=["submitted_at"])

        generate_results(lb_contest)
        generate_results(live)

        self.stdout.write(self.style.SUCCESS("Fixture contests and users created."))
        self.stdout.write(f"  Slugs: {', '.join(ALL_CONTEST_SLUGS)}")
        self.stdout.write(
            f"  Users: {FIXTURE_USER_USERNAME_PREFIX}001 … "
            f"{FIXTURE_USER_USERNAME_PREFIX}{LEADERBOARD_USER_COUNT:03d} "
            f"(password: fixture-test-pass-123)"
        )
        self.stdout.write(
            f"  Leaderboard slug: {FIXTURE_SLUG_LEADERBOARD} "
            f"({LEADERBOARD_USER_COUNT} rows; default API page_size=10 → multiple pages)"
        )
        self.stdout.write(f"  Live slug: {FIXTURE_SLUG_LIVE}")
        self.stdout.write(f"  Past pagination: {len(FIXTURE_PAST_SLUGS)} ended contests + ended-empty + leaderboard")
