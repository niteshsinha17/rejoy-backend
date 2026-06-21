from django.conf import settings
from django.core.mail import send_mail as django_send_mail


class EmailService:
    def send_mail(self, subject: str, message: str, recipient_email: str):
        django_send_mail(
            subject,
            message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[recipient_email],
        )
