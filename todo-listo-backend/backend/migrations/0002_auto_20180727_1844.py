# Generated by Django 2.0.4 on 2018-07-27 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarea',
            name='fecha_termino',
            field=models.DateTimeField(null=True),
        ),
    ]
