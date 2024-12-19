import phonenumbers
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from authentication.data_serializers import AuthLoginResponseDataSerializer
from authentication.entities import AuthLoginResponseData, Permissions
from authentication.exceptions import (
    EmailAlreadyExistsException,
    InvalidOtpException,
    OtpExpiredException,
)
from authentication.services.email_verification import (
    EmailVerificationService,
    create_or_get_authentication_token,
)
from authentication.services.phone_verification import PhoneVerificationService
from common.apis import BaseApi, OpenApi
from core.models import DoctorProfile, User
from core.user.constants import NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH
from core.user.services import CreateUserService
from core.utils import get_phone_number_with_country_code


class AuthVerifyView(BaseApi):
    def get(self, request, *args, **kwargs):
        user = self.get_user()
        token, _ = create_or_get_authentication_token(user)
        # assuming that user is a doctor, Change this if new type of user gets added
        doctor = DoctorProfile.objects.filter(user=user).first()
        if not doctor:
            self.set_response_message("User is not a doctor")
            return self.get_response_400()
        data = AuthLoginResponseData(
            token=token.key,
            permissions=Permissions(can_access_dashboard=bool(doctor.npi_number)),
        )

        serializer = AuthLoginResponseDataSerializer(data)
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class AuthCreateDoctorUserApi(OpenApi):
    class InputSerializer(serializers.Serializer):
        first_name = serializers.CharField(max_length=NAME_MAX_LENGTH)
        last_name = serializers.CharField(allow_blank=True)
        password = serializers.CharField(
            max_length=PASSWORD_MAX_LENGTH,
            required=True,
        )
        email = serializers.EmailField(required=True)

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        email = str(data["email"]).lower()
        try:
            CreateUserService().create_user(
                first_name=data["first_name"],
                last_name=data["last_name"] or "",
                password=data["password"],
                email=email,
                is_doctor=True,
            )
            EmailVerificationService().send_email_otp(email)
        except EmailAlreadyExistsException:
            return Response(
                data={
                    "email": [
                        "Email already in use",
                    ],
                },
                status=HTTP_400_BAD_REQUEST,
            )
        except ValidationError as e:
            self.set_response_message("Validation Error")
            return Response(data=e.message_dict, status=HTTP_400_BAD_REQUEST)
        return Response(
            {
                "message": "User created successfully. Please verify your email to login."
            },
            status=HTTP_200_OK,
        )


class AuthActivateUserApi(OpenApi):

    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)
        otp = serializers.CharField(required=True)

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        email = str(data["email"]).lower()
        otp = data["otp"]
        try:
            user = User.objects.get(email=email)
            EmailVerificationService().verify_email_otp(email, otp)
            CreateUserService().active_user(user)
        except OtpExpiredException:
            self.set_response_message("Verification Code expired")
            return self.get_response_400()
        except InvalidOtpException:
            self.set_response_message("Invalid Verification Code")
            return self.get_response_400()
        except User.DoesNotExist:
            self.set_response_message("User not registered")
            return self.get_response_400()
        token, _ = create_or_get_authentication_token(user)
        data = AuthLoginResponseData(
            token=token.key, permissions=Permissions(can_access_dashboard=False)
        )
        serializer = AuthLoginResponseDataSerializer(data)
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class AuthLoginView(OpenApi):
    class AuthLoginInputSerializer(serializers.Serializer):
        email = serializers.EmailField(
            required=True,
        )
        password = serializers.CharField(
            required=True,
        )

    input_serializer_class = AuthLoginInputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()

        email = data["email"]
        password = data["password"]
        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                data={
                    "email": [
                        "Email not registered",
                    ],
                },
                status=HTTP_400_BAD_REQUEST,
            )
        if not user.check_password(password):
            return Response(
                data={
                    "password": [
                        "Password is incorrect",
                    ],
                },
                status=HTTP_400_BAD_REQUEST,
            )
        token, _ = create_or_get_authentication_token(user)
        doctor = DoctorProfile.objects.filter(user=user).first()
        if doctor:
            permissions = Permissions(can_access_dashboard=bool(doctor.npi_number))
        else:
            permissions = Permissions(can_access_dashboard=False)
        data = AuthLoginResponseData(token=token.key, permissions=permissions)
        serializer = AuthLoginResponseDataSerializer(data)
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class AuthCreateGuestUserAPI(OpenApi):
    class InputSerializer(serializers.Serializer):
        first_name = serializers.CharField(max_length=NAME_MAX_LENGTH)
        last_name = serializers.CharField(allow_blank=True)
        email = serializers.EmailField()
        phone_number = serializers.CharField(max_length=30)

        # custom validation for phone number
        def validate_phone_number(self, value):
            modified_number = get_phone_number_with_country_code(value)
            try:
                phone_number = phonenumbers.parse(modified_number, None)
            except phonenumbers.phonenumberutil.NumberParseException:
                raise serializers.ValidationError("Invalid phone number")
            if not phonenumbers.is_valid_number(phone_number):
                raise serializers.ValidationError("Invalid phone number.")
            return modified_number

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        phone_number = data["phone_number"]
        user = User.objects.filter(phone_number__icontains=phone_number).first()
        if user:
            return Response(
                data={
                    "existing_user": True,
                },
                status=HTTP_400_BAD_REQUEST,
            )
        # check if user with email already exists
        if User.objects.filter(email=data["email"]).exists():
            return Response(
                data={
                    "email": [
                        "Email already in use",
                    ],
                },
                status=HTTP_400_BAD_REQUEST,
            )
        user = CreateUserService().create_guest_user(
            first_name=data["first_name"],
            last_name=data["last_name"] or "",
            email=data["email"],
            phone_number=data["phone_number"],
        )
        # send otp to phone number
        PhoneVerificationService().send_otp(phone_number)
        return Response(
            {
                "message": "Verification Code sent successfully",
            },
            status=HTTP_200_OK,
        )


class AuthSendPhoneVerificationOTP(OpenApi):

    class InputSerializer(serializers.Serializer):
        phone_number = serializers.CharField(max_length=15)

        def validate_phone_number(self, value):
            modified_number = get_phone_number_with_country_code(value)
            try:
                phone_number = phonenumbers.parse(modified_number, None)
            except phonenumbers.phonenumberutil.NumberParseException:
                raise ValidationError("Invalid phone number")
            if not phonenumbers.is_valid_number(phone_number):
                raise ValidationError("Invalid phone number.")
            if not User.objects.filter(phone_number__icontains=value).exists():
                raise ValidationError("Phone number not registered.")
            return modified_number

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        phone_number = data["phone_number"]
        try:
            PhoneVerificationService().send_otp(phone_number)
        except Exception as e:
            print(e)
            self.set_response_message("Something went wrong.")
            return Response(status=HTTP_400_BAD_REQUEST)
        return Response(
            {
                "message": "Verification Code sent successfully",
            },
            status=HTTP_200_OK,
        )


class AuthVerifyPhoneOTP(OpenApi):

    class InputSerializer(serializers.Serializer):
        phone_number = serializers.CharField(max_length=15)
        otp = serializers.CharField(max_length=6)

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        phone_number = data["phone_number"]
        otp = data["otp"]
        try:
            PhoneVerificationService().verify_otp(phone_number, otp)
        except OtpExpiredException:
            self.set_response_message("Verification Code expired")
            return self.get_response_400()
        except InvalidOtpException:
            self.set_response_message("Invalid Verification Code")
            return self.get_response_400()
        user = User.objects.filter(phone_number__icontains=phone_number).first()
        if not user:
            self.set_response_message("User not found")
            return self.get_response_400()
        token, _ = create_or_get_authentication_token(user)
        doctor = DoctorProfile.objects.filter(user=user).first()
        if doctor:
            permissions = Permissions(can_access_dashboard=bool(doctor.npi_number))
        else:
            permissions = Permissions(can_access_dashboard=False)
        data = AuthLoginResponseData(token=token.key, permissions=permissions)
        serializer = AuthLoginResponseDataSerializer(data)
        user.is_phone_number_verified = True
        user.save()
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


class SendEmailVerificationCode(OpenApi):

    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField()

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        email = data["email"]
        print("email", email)
        if not User.objects.filter(email=email, is_active=True).exists():
            self.set_response_message("Email not registered.")
            return self.get_response_400()
        try:
            EmailVerificationService().send_email_otp(email)
        except Exception as e:
            print(e)
            self.set_response_message("Something went wrong.")
            return Response(status=HTTP_400_BAD_REQUEST)
        return Response(
            {
                "message": "Verification Code sent successfully",
            },
            status=HTTP_200_OK,
        )


class ResetPassword(OpenApi):

    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField()
        otp = serializers.CharField(max_length=4)
        password = serializers.CharField(max_length=PASSWORD_MAX_LENGTH)

    input_serializer_class = InputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        email = data["email"]
        otp = data["otp"]
        password = data["password"]
        try:
            EmailVerificationService().verify_email_otp(email, otp)
            EmailVerificationService().delete_old_otp(email)
        except OtpExpiredException:
            self.set_response_message("Verification Code expired")
            return self.get_response_400()
        except InvalidOtpException:
            self.set_response_message("Invalid Verification Code")
            return self.get_response_400()
        user = User.objects.filter(email=email).first()
        if not user:
            self.set_response_message("User not found")
            return self.get_response_400()
        user.set_password(password)
        user.save()
        return Response(
            {
                "message": "Password reset successfully",
            },
            status=HTTP_200_OK,
        )
