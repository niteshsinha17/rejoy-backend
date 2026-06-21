from typing import Tuple

from rest_framework.authtoken.models import Token

from authentication.exceptions import (
    InvalidOtpException,
    InvalidTokenException,
    OtpExpiredException,
)
from authentication.models import EmailVerificationOtp
from core.utils import create_4_digit_otp, send_mail
from core.utils.common import send_html_mail
from core.models import User


def get_verification_code_template(first_name: str, otp: str) -> str:
    greeting_name = (first_name or "").strip() or "there"
    return f"""
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p>Hi {greeting_name},</p>
    <p>Thanks for signing up for Rejoy Health.</p>
    <p>To complete your signup, please use the verification code below:</p>
    <p style="font-size: 1.25rem; font-weight: bold; letter-spacing: 0.1em; color: #2664eb;">{otp}</p>
    <p>For security reasons, please do not share this code with anyone.</p>
    <p>
      If you did not request this, you can safely ignore this email or contact us at
      <a href="mailto:support@rejoyhealth.com">support@rejoyhealth.com</a>.
    </p>
    <p style="margin-top: 24px;">
      Best regards,<br>
      Rejoy Health Support<br>
      <a href="mailto:support@rejoyhealth.com">support@rejoyhealth.com</a>
    </p>
  </body>
</html>"""


def create_or_get_authentication_token(user: User) -> Tuple[Token, bool]:
    token, created = Token.objects.get_or_create(user=user)
    return token, created


class EmailVerificationService:
    def send_email_otp(self, first_name: str, email: str):
        otp = create_4_digit_otp()
        EmailVerificationOtp.objects.filter(email=email).delete()
        EmailVerificationOtp.objects.create(email=email, otp=otp)
        # if settings.DEBUG:
        #     print(otp)
        # else:
        self.send_email(first_name, email, otp)

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

    def send_email(self, first_name: str, email, otp):
        send_html_mail(
            subject="Your Rejoy Health verification code",
            message=get_verification_code_template(first_name, otp),
            recipient_list=[email],
        )

    def send_forgot_password_email(self, email):
        otp = create_4_digit_otp()
        EmailVerificationOtp.objects.filter(email=email).delete()
        EmailVerificationOtp.objects.create(email=email, otp=otp)
        # if settings.DEBUG:
        #     print(otp)
        # else:
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
