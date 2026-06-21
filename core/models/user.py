from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    email = models.EmailField()
    phone_number = PhoneNumberField(null=True, blank=True)
    is_phone_number_verified = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)
    image = models.TextField(null=True, blank=True)
    overview = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialties = models.JSONField(default=list)
    conditions_treated = models.JSONField(default=list)
    procedures_performed = models.JSONField(default=list)
    insurance_accepted = models.JSONField(default=list)
    npi_number = models.CharField(max_length=10, null=True, blank=True)
