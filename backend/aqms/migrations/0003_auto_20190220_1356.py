# Generated by Django 2.1.3 on 2019-02-20 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aqms', '0002_auto_20190214_1514'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Colevel',
        ),
        migrations.AddField(
            model_name='aqms',
            name='ppm',
            field=models.DecimalField(decimal_places=3, default=1, max_digits=5),
            preserve_default=False,
        ),
    ]
