"""Extract medical college/school names from Wikipedia lists into JSON."""

from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from django.utils.text import slugify

HEADERS = {
    "User-Agent": "RejoyHealthBot/1.0 (catalog seed; contact: support@rejoyhealth.com)",
}

PAGES = {
    "India": "List_of_medical_colleges_in_India",
    "United States": "List_of_medical_schools_in_the_United_States",
    "United Kingdom": "List_of_medical_schools_in_the_United_Kingdom",
    "Canada": "List_of_medical_schools_in_Canada",
}

NAME_HEADERS = {"name", "school", "medical school", "college", "institution"}
LOCATION_HEADERS = {"location", "city"}

SKIP_PATTERNS = re.compile(
    r"^(state|province|total|source|notes|ref\.?|see also|name|location|city|"
    r"established|university|funding|degree|status|annual intake|list of|"
    r"number of|others|mbbs|government|private)$",
    re.I,
)

OUTPUT = Path(__file__).resolve().parents[1] / "catalog" / "seed_data" / "medical_colleges.json"

REGION_TO_COUNTRY = {
    "India": "India",
    "United States": "United States",
    "United Kingdom": "United Kingdom",
    "Canada": "Canada",
}


def clean_cell(text: str) -> str:
    text = re.sub(r"\[[^\]]*\]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def fetch_html(title: str) -> str:
    response = requests.get(
        "https://en.wikipedia.org/w/api.php",
        params={
            "action": "parse",
            "page": title,
            "prop": "text",
            "format": "json",
            "disablelimitreport": True,
        },
        headers=HEADERS,
        timeout=120,
    )
    response.raise_for_status()
    return response.json()["parse"]["text"]["*"]


INVALID_NAME = re.compile(r"^(public|private|\d{4})$", re.I)
SCHOOL_HINTS = ("university", "college", "school", "institute", "medical", "medicine", "faculty")


def is_valid_college_name(name: str) -> bool:
    if not name or INVALID_NAME.match(name):
        return False
    lowered = name.lower()
    return any(hint in lowered for hint in SCHOOL_HINTS)


def find_column(headers: list[str], candidates: set[str], *, exact_only: bool = False) -> int | None:
    for index, header in enumerate(headers):
        lowered = header.lower().strip()
        if lowered in candidates:
            return index
    if exact_only:
        return None
    for index, header in enumerate(headers):
        lowered = header.lower().strip()
        if any(candidate in lowered for candidate in candidates):
            return index
    return None


def pick_school_cell(cells: list, headers: list[str]) -> tuple[str, str]:
    """Return (school_name, location_hint) from a wikitable row."""
    school_index = find_column(headers, NAME_HEADERS, exact_only=True)
    if school_index is None:
        school_index = find_column(headers, NAME_HEADERS) or 0

    location_index = find_column(headers, LOCATION_HEADERS, exact_only=True)
    if location_index is None:
        location_index = find_column(headers, LOCATION_HEADERS)

    location = ""
    if location_index is not None and location_index < len(cells):
        location = clean_cell(cells[location_index].get_text(" ", strip=True))

    if school_index < len(cells):
        cell = cells[school_index]
        link = cell.find("a")
        candidate = clean_cell(
            link.get_text(" ", strip=True) if link else cell.get_text(" ", strip=True)
        )
        if is_valid_college_name(candidate):
            return candidate, location

    # Handle Wikipedia rowspan shifts (common on the US list).
    for cell in cells:
        link = cell.find("a")
        candidate = clean_cell(
            link.get_text(" ", strip=True) if link else cell.get_text(" ", strip=True)
        )
        if is_valid_college_name(candidate):
            return candidate, location

    return "", location


def looks_like_location_only(name: str) -> bool:
    lowered = name.lower()
    keywords = ("university", "college", "school", "institute", "medical", "faculty")
    if any(word in lowered for word in keywords):
        return False
    return bool(re.fullmatch(r"[A-Za-z .,\-]+,\s*[A-Za-z .]+", name))


def extract_from_table(table, region: str, rows_out: list[dict]) -> None:
    table_rows = table.find_all("tr")
    if not table_rows:
        return

    header_cells = table_rows[0].find_all(["th", "td"])
    headers = [clean_cell(cell.get_text(" ", strip=True)) for cell in header_cells]
    if not headers:
        return

    joined = " ".join(headers).lower()
    if "number of medical colleges" in joined or "annual intake" in joined:
        return

    for row in table_rows[1:]:
        cells = row.find_all(["td", "th"])
        if not cells:
            continue

        name, location = pick_school_cell(cells, headers)
        if not name or len(name) < 4:
            continue
        if SKIP_PATTERNS.match(name):
            continue
        if looks_like_location_only(name):
            continue

        rows_out.append(
            {
                "region": region,
                "name": name,
                "location": location,
            }
        )


def disambiguate_names(rows: list[dict]) -> list[dict]:
    """Append location when the same base name repeats within a region."""
    grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for row in rows:
        grouped[(row["region"], row["name"].lower())].append(row)

    result: list[dict] = []
    for (_region, _name_key), group in grouped.items():
        if len(group) == 1:
            row = group[0]
            result.append(
                {
                    "region": row["region"],
                    "name": row["name"],
                    "location": row["location"],
                }
            )
            continue

        for row in group:
            location = row["location"]
            display_name = row["name"]
            if location:
                display_name = f"{row['name']} ({location})"
            result.append(
                {
                    "region": row["region"],
                    "name": display_name,
                    "location": location,
                }
            )
    return result


def dedupe_rows(rows: list[dict]) -> list[dict]:
    seen: set[tuple[str, str, str]] = set()
    unique: list[dict] = []
    for row in rows:
        key = (row["region"], row["name"].lower(), row.get("location", "").lower())
        if key in seen:
            continue
        seen.add(key)
        unique.append(row)
    return unique


def build_duplicate_report(colleges: list[dict]) -> list[dict]:
    by_name: dict[str, list[dict]] = defaultdict(list)
    for college in colleges:
        by_name[college["name"].lower()].append(college)

    duplicates = []
    for _lowered, group in sorted(by_name.items(), key=lambda item: (-len(item[1]), item[0])):
        if len(group) <= 1:
            continue
        duplicates.append(
            {
                "name": group[0]["name"],
                "count": len(group),
                "regions": sorted({entry["region"] for entry in group}),
                "entries": [
                    {"region": entry["region"], "location": entry.get("location", "")}
                    for entry in group
                ],
            }
        )
    return duplicates


def unique_slug(name: str, location: str, used: set[str]) -> str:
    """Assign a unique slug when regenerating JSON from Wikipedia (slugs are edited in JSON after)."""
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


def to_seed_rows(colleges: list[dict]) -> list[dict]:
    used_slugs: set[str] = set()
    rows: list[dict] = []
    for college in colleges:
        region = college["region"]
        name = college["name"].strip()
        location = (college.get("location") or "").strip()
        rows.append(
            {
                "name": name,
                "slug": unique_slug(name, location, used_slugs),
                "source_meta": {
                    "wikipedia_page": PAGES.get(region, ""),
                    "wikipedia_region": region,
                },
                "display_meta": {
                    "location": location,
                    "country": REGION_TO_COUNTRY.get(region, region),
                    "region": region,
                },
            }
        )
    rows.sort(
        key=lambda row: (
            row["display_meta"]["country"],
            row["name"].lower(),
        )
    )
    return rows


def build_shared_base_name_report(raw_rows: list[dict]) -> list[dict]:
    """Colleges that share the same Wikipedia name within one region (disambiguated by location)."""
    grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for row in raw_rows:
        grouped[(row["region"], row["name"].lower())].append(row)

    shared = []
    for (region, _base), group in sorted(
        grouped.items(), key=lambda item: (-len(item[1]), item[0][0], item[0][1])
    ):
        if len(group) <= 1:
            continue
        shared.append(
            {
                "base_name": group[0]["name"],
                "region": region,
                "count": len(group),
                "locations": sorted({row["location"] for row in group if row["location"]}),
            }
        )
    return shared


def main() -> None:
    raw_rows: list[dict] = []
    for region, page in PAGES.items():
        html = fetch_html(page)
        soup = BeautifulSoup(html, "lxml")
        content = soup.find("div", class_="mw-parser-output") or soup
        for table in content.find_all("table", class_="wikitable"):
            extract_from_table(table, region, raw_rows)

    colleges = dedupe_rows(disambiguate_names(raw_rows))
    rows = to_seed_rows(colleges)
    shared_base_names = build_shared_base_name_report(raw_rows)

    by_region = Counter((row["display_meta"]["region"] for row in rows))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")

    print("COUNTS BY REGION:")
    for region in PAGES:
        print(f"  {region}: {by_region[region]}")
    print(f"  TOTAL: {len(rows)}")
    print(f"SHARED BASE NAMES (disambiguated in name): {len(shared_base_names)}")
    for detail in shared_base_names[:10]:
        print(f"  - {detail['base_name']!r} ({detail['region']}) x{detail['count']}")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
