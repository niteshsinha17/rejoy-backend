"""Migrate medical_colleges.json to source_meta + display_meta split."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

DATA = Path(__file__).resolve().parents[1] / "catalog" / "seed_data" / "medical_colleges.json"


def normalize_location(value: str) -> str:
    return " ".join((value or "").replace(" ,", ",").split()).strip()


def transform_row(row: dict) -> dict:
    legacy = row.get("meta_details") or {}
    region = legacy.get("region", "")
    location = normalize_location(legacy.get("location", ""))
    country = legacy.get("country") or region

    return {
        "name": row["name"].strip(),
        "slug": row["slug"].strip(),
        "source_meta": {
            "wikipedia_page": legacy.get("source", ""),
            "wikipedia_region": region,
        },
        "display_meta": {
            "location": location,
            "country": country,
            "region": region,
        },
    }


def main() -> None:
    rows = json.loads(DATA.read_text(encoding="utf-8"))
    if rows and "source_meta" in rows[0]:
        print("Already migrated.")
        return

    transformed = [transform_row(row) for row in rows]
    slug_counts = Counter(row["slug"] for row in transformed)
    duplicates = [slug for slug, count in slug_counts.items() if count > 1]
    if duplicates:
        raise SystemExit(f"Duplicate slugs found: {duplicates[:10]}")

    DATA.write_text(json.dumps(transformed, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Migrated {len(transformed)} rows. Unique slugs: {len(slug_counts)}")


if __name__ == "__main__":
    main()
