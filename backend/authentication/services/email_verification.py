from typing import Tuple

from rest_framework.authtoken.models import Token

from authentication.exceptions import (
    InvalidOtpException,
    InvalidTokenException,
    OtpExpiredException,
)
from authentication.models import EmailVerificationOtp
from common.utils import create_4_digit_otp, send_mail
from common.utils.opt_generator import send_html_mail
from core.models import User


def get_verification_code_template(first_name: str, otp: str) -> str:
    return f"""
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Dear {first_name},</h2>
    <p>Welcome to <strong>Rejoy Health</strong>! I’m <strong>Rituraj</strong>, Founder and CEO, and I’m excited to have you with us.</p>
    <p>
      Rejoy Health is your personal <em>AI healthcare search engine</em>, providing trusted answers to your health questions—anytime, anywhere. 
      From symptoms and medications to the latest medical research, we’ve got you covered.
    </p>
    <p>
      Please <strong>verify your email address</strong> to ensure we can keep in touch and provide you with the best possible experience. Enter the following verification code:
    </p>
    <h3 style="color: #2664eb; text-align: center;">Verification Code: {otp}</h3>
    <p>
      Once verified, you’ll have full access to everything Rejoy Health offers. If you need assistance, I am here to help.
    </p>
    <p>Thank you for choosing Rejoy Health!</p>
    <p style="margin-top: 20px;">
      Best regards,<br>
      <strong>Rituraj</strong><br>
      Founder & CEO, Rejoy Health
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
            subject="Welcome to Rejoy Health!",
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
