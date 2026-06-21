from django.db import models

from catalog.models.mixins import SlugFromNameMixin


class Hospital(SlugFromNameMixin, models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, db_index=True)
    logo_url = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
