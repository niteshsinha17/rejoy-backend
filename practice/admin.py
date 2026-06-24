from django import forms
from django.contrib import admin

from practice.models import QuestionAttempt, UserPracticePlan


class UserPracticePlanAdminForm(forms.ModelForm):
    class Meta:
        model = UserPracticePlan
        fields = "__all__"
        help_texts = {
            "plan": "Tier for this line item. Expiry is recomputed from Started at when you save.",
            "started_at": "Expiry is recalculated from this timestamp and the plan when you save.",
            "is_active": (
                "Only one row per user may be active. Checking this deactivates every other row for that user."
            ),
        }


@admin.register(UserPracticePlan)
class UserPracticePlanAdmin(admin.ModelAdmin):
    form = UserPracticePlanAdminForm
    list_display = (
        "id",
        "user",
        "plan",
        "is_active",
        "is_lifetime",
        "started_at",
        "expires_at",
        "created_at",
        "updated_at",
    )
    fields = ("user", "plan", "is_active", "started_at", "expires_at", "is_lifetime", "created_at", "updated_at")
    readonly_fields = ("expires_at", "is_lifetime", "created_at", "updated_at")
    list_filter = ("plan", "is_active")
    search_fields = ("user__username", "user__email")
    raw_id_fields = ("user",)
    ordering = ("-updated_at",)


@admin.register(QuestionAttempt)
class QuestionAttemptAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course", "subject", "module", "question_id", "created_at")
    list_filter = ("course",)
    search_fields = ("user__username", "question_id")
    raw_id_fields = ("user",)
