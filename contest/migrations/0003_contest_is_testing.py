from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contest", "0002_contest_reminder_models"),
    ]

    operations = [
        migrations.AddField(
            model_name="contest",
            name="is_testing",
            field=models.BooleanField(
                default=False,
                help_text="When enabled, this contest is hidden from public contest lists but remains accessible by direct URL.",
            ),
        ),
    ]
