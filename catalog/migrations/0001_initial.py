import catalog.models.mixins
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Exam",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(db_index=True, max_length=255)),
                ("slug", models.SlugField(max_length=255)),
            ],
            options={
                "ordering": ["name"],
            },
            bases=(catalog.models.mixins.SlugFromNameMixin, models.Model),
        ),
        migrations.CreateModel(
            name="Hospital",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(db_index=True, max_length=255)),
                ("slug", models.SlugField(max_length=255)),
                ("logo_url", models.TextField(blank=True, null=True)),
                ("is_verified", models.BooleanField(default=False)),
            ],
            options={
                "ordering": ["name"],
            },
            bases=(catalog.models.mixins.SlugFromNameMixin, models.Model),
        ),
        migrations.CreateModel(
            name="MedicalCollege",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(db_index=True, max_length=255)),
                ("slug", models.SlugField(max_length=255)),
            ],
            options={
                "ordering": ["name"],
            },
            bases=(catalog.models.mixins.SlugFromNameMixin, models.Model),
        ),
    ]
