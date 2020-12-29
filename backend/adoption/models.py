from django.db import models


# Create your models here.
class Dog_Data(models.Model):
    """犬のデータ管理モデル"""
    GENDER = (('m', 'Male'), ('f', 'Female'))
    REASON = (('1', 'abandoned at the shelter'), ('2', 'injured'), ('3', 'rescued from streets'), ('4', 'other'))

    name = models.CharField(max_length=30)
    gender = models.CharField(max_length=6, choices=GENDER)
    age = models.PositiveIntegerField(verbose_name='Age')
    height = models.PositiveIntegerField()
    observations = models.TextField()
    people_friendly = models.PositiveIntegerField()
    dog_friendly = models.PositiveIntegerField()
    color = models.CharField(max_length=20)
    hair = models.CharField(max_length=10)
    reason_for_arrival = models.TextField(null=True, choices=REASON)
    photo1 = models.ImageField(blank=True)
    photo2 = models.ImageField(blank=True)
    photo3 = models.ImageField(blank=True)
    registered_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # 管理ページで表示する際に、nameを返す記述
    def __str__(self):
        return self.name
