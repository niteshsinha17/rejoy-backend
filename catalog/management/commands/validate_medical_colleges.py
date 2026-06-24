"""
Validate catalog/seed_data/medical_colleges.json before commit or deploy.

Run locally after editing the JSON, then push and seed on the server.

Usage:
    python manage.py validate_medical_colleges
"""

from __future__ import annotations

from django.core.management.base import BaseCommand, CommandError

from catalog.seed_data.medical_colleges_loader import (
    read_medical_college_seed_rows,
    validate_medical_college_seed_payload,
)


class Command(BaseCommand):
    help = "Validate medical_colleges.json (unique slugs, required fields)."

    def handle(self, *args, **options):
        try:
            rows = read_medical_college_seed_rows()
        except (OSError, ValueError) as exc:
            raise CommandError(str(exc)) from exc

        result = validate_medical_college_seed_payload(rows)
        if not result.ok:
            for line in result.errors:
                self.stderr.write(self.style.ERROR(line))
            for slug, names in sorted(result.duplicate_slugs.items()):
                self.stderr.write(
                    self.style.ERROR(f"  slug {slug!r}: {', '.join(names)}")
                )
            raise CommandError(
                f"Validation failed for {result.total} row(s). "
                "Fix medical_colleges.json locally before seeding."
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"OK: {result.total} medical college row(s), all slugs unique."
            )
        )
