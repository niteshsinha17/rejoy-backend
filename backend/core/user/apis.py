import requests
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from common.apis import BaseApi, OpenApi, OptionalAuthApi
from core.models import DoctorProfile, User
from core.user.serializers import DoctorProfileSerializer, UserBasicDetailSerializer
from core.user.services import AgentService, AskService


class UserBasicDetailApi(BaseApi):
    def get(self, request, *args, **kwargs):
        user = self.get_user()
        serializer = UserBasicDetailSerializer(user)
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class DoctorProfileApi(BaseApi):

    def get(self, request, *args, **kwargs):
        doctor_profile = self.get_doctor_profile()
        serializer = DoctorProfileSerializer(doctor_profile)
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class UpdateDoctorProfileApi(BaseApi):

    def put(self, request, *args, **kwargs):
        data = request.data
        doctor_profile = self.get_doctor_profile()

        serializer = DoctorProfileSerializer(doctor_profile, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class DoctorPublicProfile(OpenApi):
    def get(self, request, *args, **kwargs):
        username = kwargs["username"]
        doctor_profile = get_object_or_404(DoctorProfile, user__username=username)
        serializer = DoctorProfileSerializer(doctor_profile)
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class UpdateNpiNumberApi(BaseApi):
    class InputSerializer(serializers.Serializer):
        npi_number = serializers.CharField()
        first_name = serializers.CharField()
        last_name = serializers.CharField(required=False)

    input_serializer_class = InputSerializer

    def put(self, request, *args, **kwargs):
        data = self.validate_input_data()
        doctor_profile = self.get_doctor_profile()

        # Check NPI number validity
        if not self.check_npi(data["npi_number"]):
            self.set_response_message("Invalid NPI number")
            return self.get_response_400()

        doctor_profile.npi_number = data["npi_number"]
        doctor_profile.save()
        user = self.get_user()
        user.first_name = data["first_name"]
        if "last_name" in data:
            user.last_name = data["last_name"]
        user.save()
        return Response(
            data={"message": "NPI number updated successfully"},
            status=HTTP_200_OK,
        )

    def check_npi(self, npi_number):
        response = requests.get(
            f"https://npiregistry.cms.hhs.gov/api/?number={npi_number}&version=2.1"
        )
        if response.status_code == 200:
            data = response.json()
            if data.get("results"):
                return True
        return False


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()
    sender = serializers.ChoiceField(choices=["user", "agent"])


class GenerateAgentResponseApi(OpenApi):

    class InputSerializer(serializers.Serializer):
        message = serializers.CharField()
        history = serializers.ListField(child=MessageSerializer())

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        doctor_username = kwargs["username"]
        data = self.validate_input_data()
        user = get_object_or_404(User, username=doctor_username)
        service = AgentService(user)
        res = service.get_response(data["history"], data["message"])
        return Response(
            data=res,
            status=HTTP_200_OK,
        )


class AskApi(BaseApi):

    class InputSerializer(serializers.Serializer):
        message = serializers.CharField()
        history = serializers.ListField(child=MessageSerializer())

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        user = self.get_user()
        service = AskService(user)
        res = service.get_response(data["history"], data["message"])
        return Response(
            data=res,
            status=HTTP_200_OK,
        )
