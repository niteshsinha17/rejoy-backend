from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("catalog", "0002_medicalcollege_parent_and_location"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="medicalcollege",
            name="parent",
        ),
        migrations.RemoveField(
            model_name="medicalcollege",
            name="is_network_root",
        ),
    ]
