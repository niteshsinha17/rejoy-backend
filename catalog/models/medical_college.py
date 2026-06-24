from django.db import models

from catalog.utils.medical_college_display import (
    build_medical_college_display_meta,
    build_medical_college_subtitle,
)


class MedicalCollege(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    location = models.CharField(max_length=128, blank=True, default="")
    country = models.CharField(max_length=64, blank=True, default="")
    region = models.CharField(
        max_length=64,
        blank=True,
        default="",
        help_text="Wikipedia list region (e.g. India, United States).",
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    @property
    def subtitle(self) -> str:
        return build_medical_college_subtitle(self)

    @property
    def display_meta(self) -> dict:
        return build_medical_college_display_meta(self)