from rest_framework import serializers

from core.user.constants import PASSWORD_MAX_LENGTH


class AuthResetPasswordInputSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        max_length=PASSWORD_MAX_LENGTH,
        required=True,
    )
    new_password = serializers.CharField(
        max_length=PASSWORD_MAX_LENGTH,
        required=True,
    )


class AuthForgotPasswordOTPInputSerializer(serializers.Serializer):
    email = serializers.EmailField()


class AuthForgotPasswordInputSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()
    password = serializers.CharField(
        max_length=PASSWORD_MAX_LENGTH,
        required=True,
    )


class AuthActiveUserInputSerializer(serializers.Serializer):
    username = serializers.CharField()
    otp = serializers.CharField()


class AuthSendEmailVerificationOtpInputSerializer(serializers.Serializer):
    username = serializers.CharField()
