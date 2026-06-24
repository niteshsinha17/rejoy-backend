import re

import phonenumbers
import phonenumbers.util
from django.forms import ValidationError

from core.utils import get_phone_number_with_country_code


def username_validator(username):
    reserved_usernames = [
        "home",
        "en",
        "django-admin",
        "admin",
        "product",
        "products",
        "account-settings",
        "earnings",
        "messages",
        "profile",
        "user",
        "wallet",
        "login",
        "register",
        "forgot-password",
    ]

    if username in reserved_usernames:
        raise ValidationError("Can't use this username")

    if username.startswith("-"):
        raise ValidationError("Username cannot start with -")

    if username.endswith("-"):
        raise ValidationError("Username cannot end with -")

    if " " in username:
        raise ValidationError("Username cannot contain spaces")

    # Regular expression to check for special characters
    if not re.search(r"^[a-zA-Z0-9._]{1,30}$", username):
        raise ValidationError(
            "Username must be alphanumeric and less than 30 characters"
        )

    return username


def phone_number_validator(phone_number):
    # number should have country code
    if len(phone_number) < 0:
        raise ValidationError("Phone number is required")
    modified_number = get_phone_number_with_country_code(phone_number)
    try:
        phone_number = phonenumbers.parse(modified_number, None)
    except phonenumbers.phonenumberutil.NumberParseException:
        raise ValidationError("Invalid phone number")
    if not phonenumbers.is_valid_number(phone_number):
        raise ValidationError("Invalid phone number.")
    return modified_number
