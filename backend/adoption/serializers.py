from rest_framework import serializers
from . models import Dog_Data
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# ユーザーのデータをシリアライズする記述
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)   # パスワードをハッシュ化
        Token.objects.create(user=user)     # ユーザー毎のトークンを生成
        return user


# 犬のデータをシリアライズする記述
class Dog_DataSerializer(serializers.ModelSerializer):

    registered_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Dog_Data
        fields = ['id', 'name', 'gender', 'age', 'height', 'observations', 'people_friendly', 'dog_friendly', 'color', 'hair', 'reason_for_arrival', 'registered_at', 'updated_at']