# Generated by Django 3.1.6 on 2021-02-13 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newblog', '0002_auto_20210213_1144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog_details',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]