# Generated by Django 3.1.6 on 2021-02-13 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newblog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog_details',
            name='image',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
