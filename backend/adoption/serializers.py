from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Dog_Data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()  # アクティブなユーザーモデルの取得
        fields = ('id', 'email', 'password')  # 取り扱うパラメータの設定
        extra_kwargs = {'password': {'write_only': True}}  # write_only属性の設定

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'accountName', 'accountProfile', 'totalDonation', 'avatar', 'accountType')
        extra_kwargs = {'accountProfile': {'read_only': True}}


class Dog_DataSerializer(serializers.ModelSerializer):
    registered_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Dog_Data
        fields = ('id', 'dogName', 'gender', 'age', 'height', 'observations', 'peopleFriendly', 'dogFriendly',
                  'color', 'hair', 'reason_for_arrival', 'photo', 'companyPost', 'registered_at', 'updated_at',
                  'procedure')
        extra_kwargs = {'companyPost': {'read_only': True}}
