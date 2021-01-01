from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Dog_Data


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'company_name', 'company_profile')
        extra_kwargs = {'company_profile': {'read_only': True}}


class Dog_DataSerializer(serializers.ModelSerializer):

    registered_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Dog_Data
        fields = ('id', 'name', 'gender', 'age', 'height', 'observations', 'people_friendly', 'dog_friendly',
                  'color', 'hair', 'reason_for_arrival', 'photo', 'company_post', 'registered_at', 'updated_at')
        extra_kwargs = {'company_post': {'read_only': True}}
