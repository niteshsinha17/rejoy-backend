import enum
import random
from typing import Optional, Type, TypeVar

from django.conf import settings
from django.core.mail import send_mail as django_send_mail
from django.db import models


def create_6_digit_otp():
    if settings.DEBUG:
        return 123456
    return random.randint(100000, 999999)


def create_4_digit_otp():
    if settings.DEBUG:
        return 1234
    return random.randint(1000, 9999)


def send_mail(subject, message, recipient_list):
    print("send email", recipient_list, subject, message)
    django_send_mail(
        subject,
        message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=recipient_list,
    )


class FileType(enum.Enum):
    UNKNOWN = "Unknown"
    PDF = "PDF"
    CSV = "CSV"
    IMAGE = "Image"
    DOCX = "DOCX"


class FileTypeInfo:
    @staticmethod
    def get_file_type(file_name):
        # Determine file type using file extension
        file_extension = file_name.split(".")[-1].lower()

        if file_extension == "pdf":
            return FileType.PDF
        elif file_extension == "csv":
            return FileType.CSV
        elif file_extension in ["jpg", "jpeg", "png", "gif"]:
            return FileType.IMAGE
        elif file_extension == "docx":
            return FileType.DOCX
        else:
            return FileType.UNKNOWN


T = TypeVar("T", bound=models.Model)


def get_object_or_none(model: Type[T], **kwargs) -> Optional[T]:
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None
