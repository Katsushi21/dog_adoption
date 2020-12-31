from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings


def upload_photo_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['photo', str(instance.company_profile.id)+str(instance.company_name)+str(".")+str(ext)])


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


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Profile(models.Model):
    company_name = models.CharField(max_length=50)
    company_profile = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='company_profile',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.company_name


class Dog_Data(models.Model):
    
    GENDER = (('m', 'Male'), ('f', 'Female'))
    HAIR = (('l', 'long'), ('m', 'middle'), ('s', 'short'))
    REASON = (('1', 'abandoned at the shelter'), ('2', 'injured'), ('3', 'rescued from streets'), ('4', 'other'))

    name = models.CharField(max_length=30)
    gender = models.CharField(max_length=6, choices=GENDER)
    age = models.PositiveIntegerField(verbose_name='Age')
    height = models.PositiveIntegerField()
    observations = models.TextField()
    people_friendly = models.PositiveIntegerField()
    dog_friendly = models.PositiveIntegerField()
    color = models.CharField(max_length=20)
    hair = models.CharField(max_length=6, choices=HAIR)
    reason_for_arrival = models.TextField(null=True, choices=REASON)
    photo = models.ImageField(blank=True, upload_to=upload_photo_path)
    company_post = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='company_post',
        on_delete=models.CASCADE
    )
    registered_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # 管理ページで表示する際に、nameを返す記述
    def __str__(self):
        return self.name
