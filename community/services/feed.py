from django.db.models import Q, QuerySet

from catalog.models import Exam, Hospital, MedicalCollege
from community.models import Hashtag, Post, TopicType
from community.services.rail import POPULAR_POST_ORDERING
from community.services.topic import resolve_topic_by_slug
from community.utils import normalize_hashtag_query


def _topic_name_search_q(term: str) -> Q:
    q = Q()
    hospital_ids = list(
        Hospital.objects.filter(name__icontains=term).values_list("pk", flat=True)
    )
    if hospital_ids:
        q |= Q(topic_type=TopicType.HOSPITAL, topic_id__in=hospital_ids)
    college_ids = list(
        MedicalCollege.objects.filter(
            Q(name__icontains=term)
            | Q(location__icontains=term)
            | Q(country__icontains=term)
            | Q(region__icontains=term)
        ).values_list("pk", flat=True)
    )
    if college_ids:
        q |= Q(topic_type=TopicType.MEDICAL_COLLEGE, topic_id__in=college_ids)
    exam_ids = list(
        Exam.objects.filter(name__icontains=term).values_list("pk", flat=True)
    )
    if exam_ids:
        q |= Q(topic_type=TopicType.EXAMS, topic_id__in=exam_ids)
    return q


def _search_query(search: str) -> Q:
    """Match title, body plain text, topic name, author, and hashtags."""
    term = search.strip()
    tag_term = normalize_hashtag_query(term)
    q = (
        Q(text_data__title__icontains=term)
        | Q(text_data__body__text__icontains=term)
        | Q(user__first_name__icontains=term)
        | Q(user__last_name__icontains=term)
        | Q(user__username__icontains=term)
        | Q(comments__body__icontains=term, comments__deleted_at=None)
    )
    topic_q = _topic_name_search_q(term)
    if topic_q:
        q |= topic_q
    if tag_term:
        q |= Q(hashtags__name__icontains=tag_term)
    return q


def get_feed_queryset(
    sort: str,
    search: str,
    topic_slug: str,
) -> QuerySet[Post]:
    qs: QuerySet[Post] = Post.objects.prefetch_related("hashtags").filter(
        deleted_at=None
    )

    topic_slug = (topic_slug or "").strip()
    if topic_slug:
        resolved = resolve_topic_by_slug(topic_slug)
        if resolved:
            topic_type, topic_id = resolved
            qs = qs.filter(topic_type=topic_type, topic_id=topic_id)
        elif Hashtag.objects.filter(name=topic_slug).exists():
            qs = qs.filter(hashtags__name=topic_slug)
        else:
            qs = qs.none()

    search = (search or "").strip()
    if search:
        qs = qs.filter(_search_query(search))

    if search or topic_slug:
        qs = qs.distinct()

    if sort == "latest":
        return qs.order_by("-created_at")
    return qs.order_by(*POPULAR_POST_ORDERING)


def get_my_posts_queryset(user) -> QuerySet[Post]:
    """Posts authored by the signed-in user, newest first."""
    return (
        Post.objects.prefetch_related("hashtags")
        .filter(deleted_at=None, user=user)
        .order_by("-created_at")
    )
