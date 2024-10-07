from django.core.exceptions import ValidationError


class BaseValidationError(ValidationError):
    pass
