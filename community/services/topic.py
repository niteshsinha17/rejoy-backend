from django.core.exceptions import ValidationError

from catalog.models import Exam, Hospital, MedicalCollege
from community.models import Post, TopicType


def get_topic_model(topic_type: str) -> type:
    if topic_type == TopicType.HOSPITAL:
        return Hospital
    if topic_type == TopicType.MEDICAL_COLLEGE:
        return MedicalCollege
    if topic_type == TopicType.EXAMS:
        return Exam
    raise ValidationError("Invalid topic_type.")


def serialize_topic_row(topic_type: str, row) -> dict:
    data = {
        "topic_type": topic_type,
        "id": row.pk,
        "slug": row.slug,
        "name": row.name,
    }
    if topic_type == TopicType.HOSPITAL:
        data["logo_url"] = row.logo_url
    if topic_type == TopicType.MEDICAL_COLLEGE:
        data["subtitle"] = row.subtitle
        data["display_meta"] = row.display_meta
    return data


def get_topic_display(topic_type: str, topic_id: int) -> dict | None:
    model = get_topic_model(topic_type)
    row = model.objects.filter(pk=topic_id).first()
    if not row:
        return None
    return serialize_topic_row(topic_type, row)


def batch_fetch_topics(posts: list[Post]) -> dict[tuple[str, int], dict]:
    """Batch-resolve topic display dicts for a list of posts (avoids N+1)."""
    by_type: dict[str, set[int]] = {}
    for post in posts:
        if post.topic_type and post.topic_id:
            by_type.setdefault(post.topic_type, set()).add(post.topic_id)

    out: dict[tuple[str, int], dict] = {}
    for topic_type, ids in by_type.items():
        if not ids:
            continue
        model = get_topic_model(topic_type)
        for row in model.objects.filter(pk__in=ids):
            out[(topic_type, row.pk)] = serialize_topic_row(topic_type, row)
    return out


def resolve_topic_by_slug(slug: str) -> tuple[str, int] | None:
    slug = (slug or "").strip()
    if not slug:
        return None

    row = Hospital.objects.filter(slug=slug).first()
    if row:
        return TopicType.HOSPITAL, row.pk

    row = MedicalCollege.objects.filter(slug=slug).first()
    if row:
        return TopicType.MEDICAL_COLLEGE, row.pk

    row = Exam.objects.filter(slug=slug).first()
    if row:
        return TopicType.EXAMS, row.pk

    return None


def resolve_topic_for_post(topic_payload: dict) -> tuple[str, int]:
    topic_type = topic_payload.get("topic_type")
    topic_id = topic_payload.get("id")
    name = (topic_payload.get("name") or "").strip()

    if not topic_type:
        raise ValidationError("topic_type is required.")

    model = get_topic_model(topic_type)

    if topic_type in (TopicType.MEDICAL_COLLEGE, TopicType.EXAMS):
        if topic_id is None:
            raise ValidationError("Topic id is required for this topic type.")
        row = model.objects.filter(pk=topic_id).first()
        if not row:
            raise ValidationError("Topic not found.")
        return topic_type, row.pk

    if topic_id is not None:
        row = model.objects.filter(pk=topic_id).first()
        if not row:
            raise ValidationError("Topic not found.")
        return topic_type, row.pk

    if not name:
        raise ValidationError("Topic is required.")

    if topic_type == TopicType.HOSPITAL:
        logo_url = (topic_payload.get("logo_url") or "").strip() or None
        hospital, _ = Hospital.objects.get_or_create(
            name=name,
            defaults={"logo_url": logo_url},
        )
        return TopicType.HOSPITAL, hospital.pk

    row, _ = model.objects.get_or_create(name=name)
    return topic_type, row.pk


def search_medical_college_topics(q: str, limit: int = 20) -> list[dict]:
    from django.db.models import Q

    return [
        serialize_topic_row(TopicType.MEDICAL_COLLEGE, row)
        for row in MedicalCollege.objects.filter(
            Q(name__icontains=q)
            | Q(location__icontains=q)
            | Q(country__icontains=q)
            | Q(region__icontains=q)
        ).order_by("name")[:limit]
    ]


def search_exam_topics(q: str, limit: int = 20) -> list[dict]:
    return [
        serialize_topic_row(TopicType.EXAMS, row)
        for row in Exam.objects.filter(name__icontains=q).order_by("name")[:limit]
    ]


def search_hospital_topics(q: str, limit: int = 20) -> list[dict]:
    return [
        serialize_topic_row(TopicType.HOSPITAL, row)
        for row in Hospital.objects.filter(name__icontains=q).order_by("name")[:limit]
    ]


def search_topics(q: str, limit: int = 20) -> list[dict]:
    q = (q or "").strip()
    if len(q) < 2:
        return []

    results: list[dict] = []
    results.extend(search_hospital_topics(q, limit))
    results.extend(search_medical_college_topics(q, limit))
    results.extend(search_exam_topics(q, limit))

    results.sort(key=lambda row: row["name"].lower())
    return results[:limit]
