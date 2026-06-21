from catalog.utils.slug import slug_from_name


class SlugFromNameMixin:
    """Set slug from name on first save only; never overwrite an existing slug."""

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slug_from_name(self.name)
        super().save(*args, **kwargs)
