from django.contrib import admin, messages
import requests

from contest.models import (
    Contest,
    ContestAttempt,
    ContestQuestionAttempt,
    ContestReminderNotification,
    ContestReminderRegistration,
)
from contest.schemas import parse_contest_questions_json


@admin.register(Contest)
class ContestAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "slug",
        "course",
        "get_status",
        "is_testing",
        "marking_scheme",
        "start_time",
        "end_time",
        "total_questions",
    ]
    list_filter = ["is_testing", "marking_scheme", "course"]
    search_fields = ["title", "slug"]
    readonly_fields = ["total_questions", "created_at", "updated_at"]
    fieldsets = [
        (
            "Basic Info",
            {
                "fields": ["slug", "title", "description", "course", "is_testing"],
                "description": (
                    "Enable Testing to hide this contest from public lists while keeping "
                    "direct slug URLs working for QA."
                ),
            },
        ),
        (
            "Schedule",
            {
                "fields": [
                    "start_time",
                    "duration_minutes",
                ]
            },
        ),
        (
            "Questions & Scoring",
            {"fields": ["qb_url", "marking_scheme", "total_questions"]},
        ),
        (
            "Leaderboard cache",
            {
                "fields": [
                    "leaderboard_cache_payload",
                    "leaderboard_cache_computed_at",
                ],
                "description": (
                    "Cached leaderboard rows until TTL expires. Clear computed_at to force "
                    "rebuild on the next API read."
                ),
            },
        ),
        ("Timestamps", {"fields": ["created_at", "updated_at"]}),
    ]

    @admin.display(description="Status")
    def get_status(self, obj: Contest) -> str:
        return obj.status

    def save_model(self, request, obj, form, change):
        old_obj = Contest.objects.filter(pk=obj.pk).first()
        old_url = old_obj.qb_url if old_obj else None
        super().save_model(request, obj, form, change)
        if not change or old_url != obj.qb_url:
            try:
                response = requests.get(obj.qb_url, timeout=30)
                response.raise_for_status()
                questions = response.json()
                records = parse_contest_questions_json(questions)
                obj.questions_json = [r.model_dump(mode="python") for r in records]
                obj.total_questions = len(records)
                obj.answer_key_json = {str(r.id): r.cop for r in records}
                obj.leaderboard_cache_payload = []
                obj.leaderboard_cache_computed_at = None
                obj.save(
                    update_fields=[
                        "questions_json",
                        "total_questions",
                        "answer_key_json",
                        "leaderboard_cache_payload",
                        "leaderboard_cache_computed_at",
                    ]
                )
                self.message_user(
                    request,
                    f"Fetched and stored {obj.total_questions} questions (with answer key) from qb_url.",
                )
            except Exception as e:
                self.message_user(
                    request, f"Could not fetch questions: {e}", level=messages.WARNING
                )


@admin.register(ContestAttempt)
class ContestAttemptAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "contest",
        "get_status",
        "started_at",
        "submitted_at",
    ]
    list_filter = ["contest"]
    search_fields = ["user__username", "contest__title"]
    readonly_fields = ["started_at", "submitted_at"]

    @admin.display(description="Status")
    def get_status(self, obj: ContestAttempt) -> str:
        if obj.submitted_at:
            return "Submitted"
        if obj.is_expired:
            return "Expired"
        return "In Progress"


@admin.register(ContestReminderRegistration)
class ContestReminderRegistrationAdmin(admin.ModelAdmin):
    list_display = ["user", "contest", "created_at"]
    list_filter = ["contest"]
    search_fields = ["user__email", "user__username", "contest__title"]
    readonly_fields = ["user", "contest", "created_at"]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(ContestReminderNotification)
class ContestReminderNotificationAdmin(admin.ModelAdmin):
    list_display = [
        "contest",
        "sent_at",
        "recipient_count",
        "created_at",
    ]
    list_filter = ["sent_at"]
    search_fields = ["contest__title", "contest__slug"]
    readonly_fields = [
        "sent_at",
        "recipient_count",
        "error_summary",
        "created_at",
    ]

    def get_readonly_fields(self, request, obj=None):
        if obj and obj.sent_at:
            return self.readonly_fields + ["contest"]
        return self.readonly_fields


@admin.register(ContestQuestionAttempt)
class ContestQuestionAttemptAdmin(admin.ModelAdmin):
    list_display = [
        "contest_attempt",
        "question_id",
        "selected_options",
        "is_skipped",
    ]
    list_filter = ["contest_attempt__contest"]
    search_fields = ["contest_attempt__user__username"]
