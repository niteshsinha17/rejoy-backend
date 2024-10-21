from typing import Tuple

from rest_framework.authtoken.models import Token

from authentication.exceptions import (
    InvalidOtpException,
    InvalidTokenException,
    OtpExpiredException,
)
from authentication.models import EmailVerificationOtp
from common.utils import create_4_digit_otp, send_mail
from core.models import User


def create_or_get_authentication_token(user: User) -> Tuple[Token, bool]:
    token, created = Token.objects.get_or_create(user=user)
    return token, created


class EmailVerificationService:
    def send_email_otp(self, email: str):
        otp = create_4_digit_otp()
        EmailVerificationOtp.objects.filter(email=email).delete()
        EmailVerificationOtp.objects.create(email=email, otp=otp)
        self.send_email(email=email, otp=otp)

    def delete_old_otp(self, email: str):
        EmailVerificationOtp.objects.filter(email=email).delete()

    def verify_email_otp(self, email: str, otp: str):
        otp_obj = EmailVerificationOtp.objects.filter(email=email).first()
        if otp_obj:
            if otp_obj.is_otp_expired():
                otp_obj.delete()
                raise OtpExpiredException("OTP expired")
            if otp_obj.otp != otp:
                raise InvalidOtpException("Invalid OTP")
        else:
            raise OtpExpiredException("OTP expired")

    def send_email(self, email, otp):
        send_mail(
            subject="Rejoy Health Email Verification Code",
            message=f"""
Hi,
To verify your email address, please use the following code: {otp}

Regards,
Rejoy Health Team
            """,
            recipient_list=[email],
        )

    def send_forgot_password_email(self, email):
        otp = create_4_digit_otp()
        EmailVerificationOtp.objects.filter(email=email).delete()
        EmailVerificationOtp.objects.create(email=email, otp=otp)
        send_mail(
            subject="Forgot Password OTP",
            message=f"Please find the neurality forgot password OTP: {otp}",
            recipient_list=[email],
        )


class VerifyUserTokenService:
    def verify_token(self, username: str, token: str):
        user = User.objects.filter(username=username).first()
        if not user:
            raise InvalidTokenException("Invalid token")
        _token, _ = create_or_get_authentication_token(user=user)
        if _token.key != token:
            raise InvalidTokenException("Invalid token")
