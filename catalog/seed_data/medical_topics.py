from dataclasses import dataclass

from django.db import transaction

from catalog.models import Exam, MedicalCollege

DUMMY_MEDICAL_COLLEGES: tuple[str, ...] = (
    "AIIMS Delhi",
    "AIIMS Jodhpur",
    "AIIMS Bhopal",
    "JIPMER Puducherry",
    "Maulana Azad Medical College",
    "Armed Forces Medical College",
    "King George's Medical University",
    "Grant Medical College",
    "Christian Medical College Vellore",
    "Seth GS Medical College",
    "Kasturba Medical College",
    "St. John's Medical College",
    "Madras Medical College",
    "Osmania Medical College",
    "Bangalore Medical College",
)

DUMMY_EXAMS: tuple[str, ...] = (
    "NEET UG",
    "NEET PG",
    "INI CET",
    "FMGE",
    "USMLE Step 1",
    "USMLE Step 2 CK",
    "PLAB",
    "AMC",
    "AIIMS PG",
    "JIPMER PG",
    "DNB CET",
    "NEET SS",
    "AIAPGET",
    "PGIMER",
    "NExT",
)


@dataclass(frozen=True)
class SeedResult:
    medical_colleges_created: int
    exams_created: int


def seed_medical_topics() -> SeedResult:
    colleges_created = 0
    exams_created = 0

    with transaction.atomic():
        for name in DUMMY_MEDICAL_COLLEGES:
            _, created = MedicalCollege.objects.get_or_create(name=name)
            if created:
                colleges_created += 1

        for name in DUMMY_EXAMS:
            _, created = Exam.objects.get_or_create(name=name)
            if created:
                exams_created += 1

    return SeedResult(
        medical_colleges_created=colleges_created,
        exams_created=exams_created,
    )
