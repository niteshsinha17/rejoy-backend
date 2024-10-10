from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from common.apis import BaseApi, OpenApi
from core.models import DoctorProfile
from core.user.serializers import DoctorProfileSerializer, UserBasicDetailSerializer


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
