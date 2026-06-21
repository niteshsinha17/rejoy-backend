import enum
import random
from typing import Optional, Type, TypeVar

from django.conf import settings
from django.core.mail import send_mail as django_send_mail
from django.core.mail.message import EmailMessage
from django.db import models


def get_phone_number_with_country_code(phone_number):
    return "+" + phone_number if phone_number[0] != "+" else phone_number


def create_6_digit_otp():
    if settings.DEBUG:
        return 123456
    return random.randint(100000, 999999)


def create_4_digit_otp():
    if settings.DEBUG:
        return 1234
    return random.randint(1000, 9999)


def send_mail(subject, message, recipient_list):
    django_send_mail(
        subject,
        message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=recipient_list,
    )


def send_html_mail(subject, message, recipient_list):
    email = EmailMessage(
        subject=subject,
        body=message,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list,
    )
    email.content_subtype = "html"
    email.send()


class FileType(enum.Enum):
    UNKNOWN = "Unknown"
    PDF = "PDF"
    CSV = "CSV"
    IMAGE = "Image"
    DOCX = "DOCX"


class FileTypeInfo:
    @staticmethod
    def get_file_type(file_name):
        file_extension = file_name.split(".")[-1].lower()

        if file_extension == "pdf":
            return FileType.PDF
        if file_extension == "csv":
            return FileType.CSV
        if file_extension in ["jpg", "jpeg", "png", "gif"]:
            return FileType.IMAGE
        if file_extension == "docx":
            return FileType.DOCX
        return FileType.UNKNOWN


T = TypeVar("T", bound=models.Model)


def get_object_or_none(model: Type[T], **kwargs) -> Optional[T]:
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None
