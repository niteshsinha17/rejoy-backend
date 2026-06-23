"""
Populate MedicalCollege rows from catalog/seed_data/medical_colleges.json.

Data shape: list of { name, slug, source_meta, display_meta }.
Regenerate: python scripts/extract_wikipedia_medical_colleges.py

Usage:
    python manage.py seed_medical_colleges
    python manage.py seed_medical_colleges --region India
    python manage.py seed_medical_colleges --dry-run
    python manage.py seed_medical_colleges --validate-slugs
"""

from __future__ import annotations

from collections import Counter

from django.core.management.base import BaseCommand, CommandError

from catalog.seed_data.medical_colleges_loader import (
    DuplicateSlugError,
    load_medical_college_seed_payload,
    seed_medical_colleges,
)


class Command(BaseCommand):
    help = "Seed medical colleges from catalog/seed_data/medical_colleges.json"

    def add_arguments(self, parser):
        parser.add_argument(
            "--region",
            choices=["India", "United States", "United Kingdom", "Canada"],
            help="Only seed colleges from one Wikipedia region.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Print counts without writing to the database.",
        )
        parser.add_argument(
            "--show-summary",
            action="store_true",
            help="Print region counts from the seed file and exit.",
        )
        parser.add_argument(
            "--validate-slugs",
            action="store_true",
            help="Validate unique slugs in the seed file and exit.",
        )

    def handle(self, *args, **options):
        try:
            rows = load_medical_college_seed_payload()
        except DuplicateSlugError as exc:
            raise CommandError(str(exc)) from exc

        if options["validate_slugs"]:
            self.stdout.write(self.style.SUCCESS(f"OK: {len(rows)} unique slugs"))
            return

        if options["show_summary"]:
            self._print_summary(rows)
            return

        region = options.get("region")
        filtered = rows
        if region:
            filtered = [
                row
                for row in rows
                if (row.get("display_meta") or {}).get("region") == region
            ]

        if options["dry_run"]:
            self.stdout.write(
                self.style.WARNING(
                    f"Dry run: would seed {len(filtered)} medical colleges"
                    + (f" for region={region}" if region else "")
                )
            )
            self._print_summary(filtered)
            return

        result = seed_medical_colleges(region=region)
        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded medical colleges: created={result.created}, "
                f"updated={result.updated}, skipped={result.skipped}, "
                f"total_in_file={result.total_in_file}"
            )
        )

    def _print_summary(self, rows: list[dict]) -> None:
        counts = Counter(
            (row.get("display_meta") or {}).get("region", "Unknown") for row in rows
        )
        for region, count in sorted(counts.items()):
            self.stdout.write(f"  {region}: {count}")
        self.stdout.write(f"  TOTAL: {len(rows)}")
