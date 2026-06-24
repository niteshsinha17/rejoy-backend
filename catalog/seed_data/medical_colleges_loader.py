from __future__ import annotations

import json
from collections import defaultdict
from dataclasses import dataclass, field
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


@dataclass
class MedicalCollegeSeedValidation:
    ok: bool
    total: int
    errors: list[str] = field(default_factory=list)
    duplicate_slugs: dict[str, list[str]] = field(default_factory=dict)

    def raise_if_invalid(self) -> None:
        if not self.ok:
            lines = list(self.errors)
            if self.duplicate_slugs:
                lines.append("Duplicate slugs:")
                for slug, names in sorted(self.duplicate_slugs.items()):
                    lines.append(f"  {slug!r}: {names}")
            raise ValueError("\n".join(lines))


class DuplicateSlugError(ValueError):
    pass


def read_medical_college_seed_rows() -> list[dict]:
    rows = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise ValueError("medical_colleges.json must be a JSON array.")
    return rows


def validate_medical_college_seed_payload(
    rows: list[dict] | None = None,
) -> MedicalCollegeSeedValidation:
    if rows is None:
        rows = read_medical_college_seed_rows()

    errors: list[str] = []
    slug_to_names: dict[str, list[str]] = defaultdict(list)

    for index, row in enumerate(rows, start=1):
        if not isinstance(row, dict):
            errors.append(f"Row {index}: must be an object.")
            continue

        name = (row.get("name") or "").strip()
        slug = (row.get("slug") or "").strip()

        if not name:
            errors.append(f"Row {index}: missing or empty name.")
        if not slug:
            errors.append(f"Row {index}: missing or empty slug.")
        elif name:
            slug_to_names[slug].append(name)

    duplicate_slugs = {
        slug: names for slug, names in slug_to_names.items() if len(names) > 1
    }
    if duplicate_slugs:
        errors.append(
            f"Found {len(duplicate_slugs)} duplicate slug(s) across {len(rows)} rows."
        )

    return MedicalCollegeSeedValidation(
        ok=not errors,
        total=len(rows),
        errors=errors,
        duplicate_slugs=duplicate_slugs,
    )


def load_medical_college_seed_payload() -> list[dict]:
    rows = read_medical_college_seed_rows()
    validation = validate_medical_college_seed_payload(rows)
    if not validation.ok:
        validation.raise_if_invalid()
        raise DuplicateSlugError("medical_colleges.json failed validation.")
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
