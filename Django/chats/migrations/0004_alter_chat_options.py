# Generated by Django 3.2.4 on 2021-08-09 13:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0003_rename_room_id_chat_room_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='chat',
            options={'ordering': ('-created_at',)},
        ),
    ]
