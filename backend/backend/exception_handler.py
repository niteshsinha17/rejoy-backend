from django.core.exceptions import NON_FIELD_ERRORS
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.serializers import as_serializer_error
from rest_framework.settings import api_settings
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    if isinstance(exc, DjangoValidationError):
        serializer_error = as_serializer_error(exc)
        if NON_FIELD_ERRORS in serializer_error:
            serializer_error[api_settings.NON_FIELD_ERRORS_KEY] = serializer_error.pop(
                NON_FIELD_ERRORS
            )
        exc = exceptions.ValidationError(serializer_error)
    response = exception_handler(exc, context)
    if response is None:
        return Response(
            {
                "message": "Something went wrong",
                api_settings.NON_FIELD_ERRORS_KEY: str(exc),
            },
            status=HTTP_500_INTERNAL_SERVER_ERROR,
        )
    if isinstance(exc, exceptions.ValidationError):
        response.data["message"] = "Validation error."
    return response
