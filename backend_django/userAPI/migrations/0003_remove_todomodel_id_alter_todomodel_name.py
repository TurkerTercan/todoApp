# Generated by Django 4.1.1 on 2022-09-25 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAPI', '0002_remove_todomodel_index'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todomodel',
            name='id',
        ),
        migrations.AlterField(
            model_name='todomodel',
            name='name',
            field=models.CharField(default='todo_name', max_length=512, primary_key=True, serialize=False),
        ),
    ]
