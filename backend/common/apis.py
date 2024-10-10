from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from core.models import DoctorProfile, User


class ResponseMessageMixin:
    _response_message = None

    def set_response_message(self, message):
        self._response_message = message

    def get_response_message(self):
        return self._response_message


class BaseApi(GenericAPIView, ResponseMessageMixin):
    input_serializer_class = None
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def validate_data(self, serializer_class, data, *args, **kwargs):
        serializer = serializer_class(data=data, *args, **kwargs)
        serializer.is_valid(raise_exception=True)
        return serializer.validated_data

    def validate_input_data(self, *args, **kwargs):
        return self.validate_data(self.input_serializer_class, self.request.data, *args, **kwargs)  # type: ignore

    def get_user(self) -> User:
        return self.request.user  # type: ignore

    def get_doctor_profile(self):
        return DoctorProfile.objects.get(user=self.get_user())

    def get_response_400(self):
        return Response(
            status=HTTP_400_BAD_REQUEST,
        )

    def get_response_200(
        self,
    ):
        return Response(
            status=HTTP_200_OK,
        )


class OpenApi(BaseApi):
    authentication_classes = ()
    permission_classes = ()
