from django.db.models.signals import post_save
from django.dispatch import receiver

from contest.models import ContestReminderNotification
from contest.services.reminder_email import ContestReminderEmailService


@receiver(post_save, sender=ContestReminderNotification)
def dispatch_contest_reminder_emails(sender, instance, created, **kwargs):
    if not created or instance.sent_at:
        return
    ContestReminderEmailService.dispatch(instance)
