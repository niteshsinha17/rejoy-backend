from django.db import models

from catalog.models.mixins import SlugFromNameMixin


class Exam(SlugFromNameMixin, models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, db_index=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
