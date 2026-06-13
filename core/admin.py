from django.contrib import admin

from core.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "username",
        "phone_number",
        "email",
        "first_name",
        "last_name",
        "is_active",
    )
    search_fields = ("username", "email", "first_name", "last_name")
    list_filter = ("is_active",)
    list_per_page = 20


admin.site.register(User, UserAdmin)
