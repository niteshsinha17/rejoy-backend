from django.db import models
from django.utils import timezone

from core.mixin import CreatedModalMixin
from core.utils import get_phone_number_with_country_code


class EmailVerificationOtp(CreatedModalMixin):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)

    def __str__(self):
        return self.email

    def is_otp_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=10)


class PhoneVerificationOtp(CreatedModalMixin):
    phone_number = models.CharField(max_length=15, unique=True)
    otp = models.CharField(max_length=6)

    def __str__(self):
        return self.phone_number

    def is_otp_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=10)

    def save(self, *args, **kwargs):
        if self.phone_number:
            try:
                self.phone_number = get_phone_number_with_country_code(
                    self.phone_number
                )
            except Exception:
                pass
        super(PhoneVerificationOtp, self).save(*args, **kwargs)
