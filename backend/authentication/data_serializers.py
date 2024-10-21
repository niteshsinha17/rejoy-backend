from rest_framework import serializers

from core.user.constants import NAME_MAX_LENGTH, USERNAME_MAX_LENGTH


class AuthLoginResponseDataSerializer(serializers.Serializer):
    token = serializers.CharField(
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
