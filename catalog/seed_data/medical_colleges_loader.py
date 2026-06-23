from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from django.db import transaction

from catalog.models import MedicalCollege

DATA_FILE = Path(__file__).resolve().parent / "medical_colleges.json"


@dataclass(frozen=True)
class MedicalCollegeSeedResult:
    created: int
    updated: int
    skipped: int
    total_in_file: int


class DuplicateSlugError(ValueError):
    pass


def load_medical_college_seed_payload() -> list[dict]:
    rows = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise ValueError("medical_colleges.json must be a list.")

    slugs = [row["slug"].strip() for row in rows if row.get("slug")]
    if len(slugs) != len(set(slugs)):
        raise DuplicateSlugError("medical_colleges.json contains duplicate slugs.")

    return rows


def _upsert_college(
    *,
    name: str,
    slug: str,
    location: str = "",
    country: str = "",
    region: str = "",
) -> tuple[MedicalCollege, bool, bool]:
    row = MedicalCollege.objects.filter(slug=slug).first()
    if row:
        updates: dict = {}
        if row.name != name:
            updates["name"] = name
        if row.location != location:
            updates["location"] = location
        if row.country != country:
            updates["country"] = country
        if row.region != region:
            updates["region"] = region
        if updates:
            for field, value in updates.items():
                setattr(row, field, value)
            row.save(update_fields=list(updates.keys()))
            return row, False, True
        return row, False, False

    row = MedicalCollege(
        name=name,
        slug=slug,
        location=location,
        country=country,
        region=region,
    )
    row.save()
    return row, True, False


def seed_medical_colleges(*, region: str | None = None) -> MedicalCollegeSeedResult:
    rows = load_medical_college_seed_payload()
    created = 0
    updated = 0
    skipped = 0
    total = 0

    with transaction.atomic():
        for row in rows:
            display = row.get("display_meta") or {}
            source = row.get("source_meta") or {}
            row_region = display.get("region") or source.get("wikipedia_region") or ""
            if region and row_region != region:
                continue

            total += 1
            name = row["name"].strip()
            slug = row["slug"].strip()
            if not name or not slug:
                continue

            location = (display.get("location") or "").strip()
            country = (display.get("country") or "").strip()
            region_label = (display.get("region") or row_region or "").strip()

            _row, was_created, was_updated = _upsert_college(
                name=name,
                slug=slug,
                location=location,
                country=country,
                region=region_label,
            )
            if was_created:
                created += 1
            elif was_updated:
                updated += 1
            else:
                skipped += 1

    return MedicalCollegeSeedResult(
        created=created,
        updated=updated,
        skipped=skipped,
        total_in_file=total,
    )
