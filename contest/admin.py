import json

import requests
from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.utils.html import format_html

from contest.exceptions import ContestJsonValidationError
from contest.models import (
    Contest,
    ContestAttempt,
    ContestQuestionAttempt,
    ContestReminderNotification,
    ContestReminderRegistration,
)
from contest.schemas import parse_contest_questions_json


class ContestAdminForm(forms.ModelForm):
    class Meta:
        model = Contest
        fields = "__all__"

    def clean(self):
        cleaned = super().clean()
        qb_url = cleaned.get("qb_url")
        if qb_url and ("qb_url" in self.changed_data or self.instance.pk is None):
            try:
                response = requests.get(qb_url, timeout=30)
                response.raise_for_status()
                payload = response.json()
            except Exception as e:
                raise ValidationError(
                    {"qb_url": f"Could not fetch questions from this URL: {e}"}
                ) from e
            try:
                records = parse_contest_questions_json(payload)
            except ContestJsonValidationError as e:
                raise ValidationError(
                    {"qb_url": f"Question data at this URL is invalid: {e}"}
                ) from e
            self._parsed_records = records
        return cleaned


@admin.register(Contest)
class ContestAdmin(admin.ModelAdmin):
    form = ContestAdminForm
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
    readonly_fields = [
        "total_questions",
        "questions_preview",
        "answer_key_preview",
        "leaderboard_cache_payload",
        "leaderboard_cache_computed_at",
        "created_at",
        "updated_at",
    ]
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
            {
                "fields": [
                    "qb_url",
                    "marking_scheme",
                    "total_questions",
                    "questions_preview",
                    "answer_key_preview",
                ],
                "description": (
                    "Questions are fetched and validated from qb_url on save. "
                    "If the URL is unreachable or the data is invalid, saving is blocked."
                ),
            },
        ),
        (
            "Leaderboard cache",
            {
                "fields": [
                    "leaderboard_cache_payload",
                    "leaderboard_cache_computed_at",
                ],
                "description": (
                    "Read-only cached leaderboard rows and last-computed time. "
                    "Managed automatically by the API; not editable here."
                ),
            },
        ),
        ("Timestamps", {"fields": ["created_at", "updated_at"]}),
    ]

    @admin.display(description="Status")
    def get_status(self, obj: Contest) -> str:
        return obj.status

    @admin.display(description="Questions JSON (parsed)")
    def questions_preview(self, obj: Contest) -> str:
        return self._json_preview(obj.questions_json)

    @admin.display(description="Answer key JSON (parsed)")
    def answer_key_preview(self, obj: Contest) -> str:
        return self._json_preview(obj.answer_key_json)

    @staticmethod
    def _json_preview(value) -> str:
        if not value:
            return "—"
        text = json.dumps(value, indent=2, ensure_ascii=False)
        return format_html(
            "<pre style='max-height:400px;overflow:auto;white-space:pre-wrap'>{}</pre>",
            text,
        )

    def save_model(self, request, obj, form, change):
        records = getattr(form, "_parsed_records", None)
        if records is not None:
            obj.questions_json = [r.model_dump(mode="python") for r in records]
            obj.total_questions = len(records)
            obj.answer_key_json = {str(r.id): r.cop for r in records}
            obj.leaderboard_cache_payload = []
            obj.leaderboard_cache_computed_at = None
            self.message_user(
                request,
                f"Fetched and stored {obj.total_questions} questions (with answer key) from qb_url.",
            )
        super().save_model(request, obj, form, change)


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
