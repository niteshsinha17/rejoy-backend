"""One-off: convert legacy medical_colleges.json to flat list format."""

from __future__ import annotations

import json
from pathlib import Path

from django.utils.text import slugify

LEGACY = Path(__file__).resolve().parents[1] / "catalog" / "seed_data" / "medical_colleges.json"

REGION_TO_COUNTRY = {
    "India": "India",
    "United States": "United States",
    "United Kingdom": "United Kingdom",
    "Canada": "Canada",
}

SOURCE_BY_REGION = {
    "India": "List_of_medical_colleges_in_India",
    "United States": "List_of_medical_schools_in_the_United_States",
    "United Kingdom": "List_of_medical_schools_in_the_United_Kingdom",
    "Canada": "List_of_medical_schools_in_Canada",
}


def unique_slug(name: str, location: str, used: set[str]) -> str:
    base = slugify(name)[:255]
    if not base:
        base = slugify(location)[:255] or "medical-college"
    slug = base
    counter = 2
    while slug in used:
        suffix = slugify(location) if location else str(counter)
        slug = f"{base}-{suffix}"[:255]
        counter += 1
    used.add(slug)
    return slug


def convert_legacy(payload: dict) -> list[dict]:
    used_slugs: set[str] = set()
    rows: list[dict] = []
    for college in payload["colleges"]:
        region = college["region"]
        name = college["name"].strip()
        location = (college.get("location") or "").strip()
        rows.append(
            {
                "name": name,
                "slug": unique_slug(name, location, used_slugs),
                "meta_details": {
                    "region": region,
                    "location": location,
                    "country": REGION_TO_COUNTRY.get(region, region),
                    "source": SOURCE_BY_REGION.get(region, ""),
                },
            }
        )
    rows.sort(key=lambda row: (row["meta_details"]["country"], row["name"].lower()))
    return rows


if __name__ == "__main__":
    payload = json.loads(LEGACY.read_text(encoding="utf-8"))
    if isinstance(payload, list):
        print(f"Already flat list ({len(payload)} rows).")
    else:
        rows = convert_legacy(payload)
        LEGACY.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote {len(rows)} rows to {LEGACY}")
