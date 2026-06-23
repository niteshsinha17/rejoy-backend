from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("catalog", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="medicalcollege",
            name="country",
            field=models.CharField(blank=True, default="", max_length=64),
        ),
        migrations.AddField(
            model_name="medicalcollege",
            name="is_network_root",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="medicalcollege",
            name="location",
            field=models.CharField(blank=True, default="", max_length=128),
        ),
        migrations.AddField(
            model_name="medicalcollege",
            name="parent",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="campuses",
                to="catalog.medicalcollege",
            ),
        ),
        migrations.AlterField(
            model_name="medicalcollege",
            name="slug",
            field=models.SlugField(max_length=255, unique=True),
        ),
    ]
