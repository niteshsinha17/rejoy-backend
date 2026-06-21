from django.db import models


class PostType(models.TextChoices):
    TEXT = "text", "Text"


class TopicType(models.TextChoices):
    HOSPITAL = "hospital", "Hospital"
    MEDICAL_COLLEGE = "medical_college", "Medical College"
    EXAMS = "exams", "Exams"
