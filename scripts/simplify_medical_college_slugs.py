"""Rewrite slugs in medical_colleges.json using short prefixes (aiims-, gmc-, etc.)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from catalog.utils.medical_college_slug import assign_unique_medical_college_slug

DATA_FILE = ROOT / "catalog" / "seed_data" / "medical_colleges.json"


def main() -> None:
    rows = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    used: set[str] = set()
    changed = 0
    samples: list[tuple[str, str, str]] = []

    for row in rows:
        display = row.get("display_meta") or {}
        location = (display.get("location") or "").strip()
        old_slug = row["slug"]
        row["slug"] = assign_unique_medical_college_slug(
            name=row["name"],
            location=location,
            used=used,
        )
        if row["slug"] != old_slug:
            changed += 1
            if len(samples) < 8:
                samples.append((row["name"], old_slug, row["slug"]))

    DATA_FILE.write_text(
        json.dumps(rows, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Updated {changed} slug(s); {len(rows)} total, {len(used)} unique.")
    for name, old, new in samples:
        print(f"  {new}  <-  {old}")
        print(f"    ({name})")


if __name__ == "__main__":
    main()
