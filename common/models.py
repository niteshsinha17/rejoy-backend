from django.db import models
from django.utils import timezone


class TimeStampBaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ("-created_at",)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super(TimeStampBaseModel, self).save(*args, **kwargs)
