from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("catalog", "0003_remove_medicalcollege_parent"),
    ]

    operations = [
        migrations.AddField(
            model_name="medicalcollege",
            name="region",
            field=models.CharField(
                blank=True,
                default="",
                help_text="Wikipedia list region (e.g. India, United States).",
                max_length=64,
            ),
        ),
    ]
