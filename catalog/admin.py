from django.contrib import admin

from catalog.models import Exam, Hospital, MedicalCollege


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_verified")
    list_filter = ("is_verified",)
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(MedicalCollege)
class MedicalCollegeAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "location", "country", "region")
    list_filter = ("country",)
    search_fields = ("name", "slug", "location")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
