# Generated by Django 3.1.4 on 2021-01-10 12:41

import adoption.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accountName', models.CharField(max_length=50)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=adoption.models.upload_avatar_path)),
                ('totalDonation', models.PositiveIntegerField(blank=True, null=True)),
                ('accountType', models.CharField(choices=[('company', 'company'), ('ordinary', 'ordinary')], max_length=8)),
                ('accountProfile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='accountProfile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Dog_Data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dogName', models.CharField(max_length=30)),
                ('gender', models.CharField(choices=[('m', 'Male'), ('f', 'Female')], max_length=6)),
                ('age', models.PositiveIntegerField(blank=True, null=True)),
                ('height', models.PositiveIntegerField(blank=True, null=True)),
                ('observations', models.TextField(blank=True, null=True)),
                ('peopleFriendly', models.PositiveIntegerField(blank=True, null=True)),
                ('dogFriendly', models.PositiveIntegerField(blank=True, null=True)),
                ('color', models.CharField(blank=True, max_length=20, null=True)),
                ('hair', models.CharField(blank=True, choices=[('l', 'long'), ('m', 'middle'), ('s', 'short')], max_length=6, null=True)),
                ('reason_for_arrival', models.CharField(blank=True, max_length=100, null=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to=adoption.models.upload_photo_path)),
                ('registered_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('procedure', models.CharField(choices=[('y', 'yes'), ('n', 'no')], max_length=3)),
                ('companyPost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='companyPost', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
