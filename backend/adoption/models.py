from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings


# プロフィール画像の保存場所の指定
def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatar', str(instance.accountProfile.id) + str(instance.accountName) + str(".") + str(ext)])


# 保護犬の写真データの保存場所の指定
def upload_photo_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['photo', str(instance.company_post.id) + str(instance.name) + str(".") + str(ext)])


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('email is required')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


# ユーザーモデルの設定
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


# プロフィールモデルの設定
class Profile(models.Model):
    Type = (('company', 'company'), ('ordinary', 'ordinary'))

    accountName = models.CharField(max_length=50)

    # アカウントプロフィールをAUTH_USER_MODELに1対1の関係で紐付ける
    accountProfile = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='accountProfile',
        on_delete=models.CASCADE
    )
    avatar = models.ImageField(blank=True, null=True, upload_to=upload_avatar_path)
    totalDonation = models.PositiveIntegerField(blank=True, null=True)
    accountType = models.CharField(max_length=8, choices=Type)

    def __str__(self):
        return self.accountName


class Dog_Data(models.Model):
    GENDER = (('m', 'Male'), ('f', 'Female'))
    HAIR = (('l', 'long'), ('m', 'middle'), ('s', 'short'))
    PROCEDURE = (('y', 'yes'), ('n', 'no'))

    dogName = models.CharField(max_length=30)
    gender = models.CharField(max_length=6, choices=GENDER)
    age = models.PositiveIntegerField(blank=True, null=True)
    height = models.PositiveIntegerField(blank=True, null=True)
    observations = models.TextField(blank=True, null=True)
    peopleFriendly = models.PositiveIntegerField(blank=True, null=True)
    dogFriendly = models.PositiveIntegerField(blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True)
    hair = models.CharField(max_length=6, choices=HAIR, blank=True, null=True)
    reason_for_arrival = models.CharField(max_length=100, blank=True, null=True)
    photo = models.ImageField(blank=True, null=True, upload_to=upload_photo_path)

    # 保護犬のデータを登録した企業の情報を紐付け
    companyPost = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='companyPost',
        on_delete=models.CASCADE
    )

    registered_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    procedure = models.CharField(max_length=3, choices=PROCEDURE)

    def __str__(self):
        return self.dogName
