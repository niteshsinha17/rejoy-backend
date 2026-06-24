"""Short, readable slugs for medical college seed rows."""

from __future__ import annotations

import re
import unicodedata

# Base name (before parenthetical location) → short prefix.
SLUG_PREFIX_BY_BASE: dict[str, str] = {
    "All India Institute of Medical Sciences": "aiims",
    "Government Medical College": "gmc",
    "Government Medical College and Hospital": "gmch",
    "GMERS Medical College and Hospital": "gmers",
    "Autonomous State Medical College": "asmc",
    "ESIC Medical College": "esic",
    "ESIC Medical College and Hospital": "esic-h",
    "ESIC Medical College and PGIMSR": "esic-pgimsr",
    "Jawaharlal Nehru Medical College": "jnmc",
    "Christian Medical College": "cmc",
    "Hi-Tech Medical College and Hospital": "hitech",
    "Hind Institute of Medical Sciences": "hims",
    "Jagannath Gupta Institute of Medical Sciences and Hospital": "jgims",
    "Kasturba Medical College": "kmc",
    "Mahatma Gandhi Memorial Medical College": "mgmmc",
    "MGM Medical College and Hospital": "mgm",
    "Rama Medical College, Hospital and Research Centre": "rama",
}

# Full display names without a parenthetical suffix.
SLUG_PREFIX_BY_FULL_NAME: dict[str, str] = {
    "ESIC Medical College & Hospital": "esic-hospital",
}

# Shorter location tokens for well-known campuses.
LOCATION_SLUG_ALIASES: dict[str, str] = {
    "ansari nagar east": "delhi",
}

_PAREN_SUFFIX_RE = re.compile(r"^(.+?)\s*\(([^)]+)\)\s*$")

_PREFIX_BY_BASE_LOWER = {k.lower(): v for k, v in SLUG_PREFIX_BY_BASE.items()}
_PREFIX_BY_FULL_NAME_LOWER = {k.lower(): v for k, v in SLUG_PREFIX_BY_FULL_NAME.items()}


def _slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^\w\s-]", "", value.lower())
    return re.sub(r"[-\s]+", "-", value).strip("-")


def _normalize_key(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").strip()).lower()


def parse_college_name(name: str) -> tuple[str, str]:
    """Return (base_name, parenthetical_location)."""
    name = (name or "").strip()
    match = _PAREN_SUFFIX_RE.match(name)
    if not match:
        return name, ""
    return match.group(1).strip(), match.group(2).strip()


def location_slug(location: str) -> str:
    key = _normalize_key(location)
    if key in LOCATION_SLUG_ALIASES:
        return LOCATION_SLUG_ALIASES[key]
    return _slugify(location)[:80]


def build_medical_college_slug(*, name: str, location: str = "") -> str:
    """
    Build a short slug where patterns allow (e.g. aiims-delhi, gmc-akola).
    Falls back to slugify(name) for unique full names.
    """
    name = (name or "").strip()
    location = (location or "").strip()

    full_key = _normalize_key(name)
    prefix = (
        SLUG_PREFIX_BY_FULL_NAME.get(name)
        or _PREFIX_BY_FULL_NAME_LOWER.get(full_key)
    )
    if prefix:
        return prefix[:255]

    base_name, paren_location = parse_college_name(name)
    if not location:
        location = paren_location

    base_key = _normalize_key(base_name)
    prefix = SLUG_PREFIX_BY_BASE.get(base_name) or _PREFIX_BY_BASE_LOWER.get(base_key)
    if prefix and location:
        loc_part = location_slug(location)
        return f"{prefix}-{loc_part}"[:255] if loc_part else prefix[:255]

    slug = _slugify(name)[:255]
    return slug or "medical-college"


def assign_unique_medical_college_slug(
    *,
    name: str,
    location: str = "",
    used: set[str],
) -> str:
    """Return a unique slug; append -2, -3, … only when needed."""
    base = build_medical_college_slug(name=name, location=location)
    slug = base
    counter = 2
    while slug in used:
        slug = f"{base}-{counter}"[:255]
        counter += 1
    used.add(slug)
    return slug
