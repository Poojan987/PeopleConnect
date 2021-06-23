# Generated by Django 3.2.4 on 2021-06-23 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20210623_1052'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='favorites',
            field=models.ManyToManyField(related_name='profile', to='posts.Post'),
        ),
    ]
