from __future__ import annotations

from catalog.models import MedicalCollege


def build_medical_college_display_meta(row: MedicalCollege) -> dict:
    return {
        k: v
        for k, v in {
            "location": row.location or None,
            "country": row.country or None,
            "region": row.region or None,
        }.items()
        if v
    }


def build_medical_college_subtitle(row: MedicalCollege) -> str:
    parts: list[str] = []
    if row.location:
        parts.append(row.location)
    if row.country and row.country != row.region:
        parts.append(row.country)
    elif row.region and row.region not in parts:
        parts.append(row.region)
    return ", ".join(parts)
