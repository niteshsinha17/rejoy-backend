from twilio.rest import Client

from authentication.exceptions import InvalidOtpException, OtpExpiredException
from authentication.models import PhoneVerificationOtp
from core.constants import (
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_VERIFICATION_NUMBER,
)
from core.utils import create_4_digit_otp
from core.utils import get_phone_number_with_country_code


class TwilioService:

    def __init__(self):
        self.client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    def send_message(self, message, from_number, to_number):
        self.client.messages.create(body=message, from_=from_number, to=to_number)


class PhoneVerificationService:

    def send_otp(self, phone_number: str):
        otp = create_4_digit_otp()
        phone_number = get_phone_number_with_country_code(phone_number)
        PhoneVerificationOtp.objects.filter(phone_number=phone_number).delete()
        PhoneVerificationOtp.objects.create(phone_number=phone_number, otp=otp)
        self.send_sms(phone_number, otp)

    def verify_otp(self, phone_number: str, otp: str):
        phone_number = get_phone_number_with_country_code(phone_number)
        otp_obj = PhoneVerificationOtp.objects.filter(phone_number=phone_number).first()
        if otp_obj:
            if otp_obj.is_otp_expired():
                otp_obj.delete()
                raise OtpExpiredException("OTP expired")
            if otp_obj.otp != otp:
                raise InvalidOtpException("Invalid OTP")
        else:
            raise OtpExpiredException("OTP expired")

    def send_sms(self, phone_number, otp):
        twilio_service = TwilioService()
        twilio_service.send_message(
            f"Please find the neurality phone verification OTP: {otp}",
            TWILIO_VERIFICATION_NUMBER,
            phone_number,
        )
