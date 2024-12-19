from rest_framework import serializers

from core.user.constants import NAME_MAX_LENGTH


class PermissionsSerializer(serializers.Serializer):
    can_access_dashboard = serializers.BooleanField(
        required=True,
    )


class AuthLoginResponseDataSerializer(serializers.Serializer):
    token = serializers.CharField(
        required=True,
    )
    permissions = PermissionsSerializer(
        required=True,
    )


class AuthSendEmailVerifyOtpInputSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
    )


class AuthCreateGuestUserInputSerializer(serializers.Serializer):
    name = serializers.CharField(
        required=True,
        max_length=NAME_MAX_LENGTH,
    )
