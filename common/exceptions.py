from django.core.exceptions import ValidationError


class BaseValidationError(ValidationError):
    """Use ``raise MyError("user-facing text")``; APIs should read ``get_api_message()`` for responses."""

    def get_api_message(self) -> str:
        if self.messages:
            return str(self.messages[0])
        return "Invalid request"
