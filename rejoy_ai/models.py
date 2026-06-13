from django.db import models
from django.utils.text import slugify

from common.mixin import CreatedModalMixin, DeletedModalMixin
from common.utils import HashIdConverter
from core.models import User


class Thread(CreatedModalMixin, DeletedModalMixin):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query = models.TextField()
    slug = models.SlugField(
        max_length=255, unique=True, db_index=True, null=True, blank=True
    )
    description = models.TextField(default="")

    def save(self, *args, **kwargs):
        # Save first to ensure `id` is available
        if not self.pk:
            super().save(*args, **kwargs)

        if not self.slug:
            base_slug = slugify(self.query)[:80]  # Use the first 50 chars for base slug
            print(base_slug)
            unique_suffix = HashIdConverter().encode(self.pk)
            self.slug = f"{base_slug}-{unique_suffix}"
            # Save again with the generated slug
            kwargs["force_insert"] = False
            super().save(*args, **kwargs)


class ThreadMessage(CreatedModalMixin, DeletedModalMixin):

    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    input = models.TextField()
    query = models.TextField()
    sources = models.JSONField()
    text = models.JSONField()
