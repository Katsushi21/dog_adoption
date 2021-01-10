from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from . import serializers
from .models import Profile, Dog_Data


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer   # 対象のシリアライザーを指定
    permission_classes = (AllowAny,)    # 誰でも新規ユーザー登録を可能とする記述


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()    # objectを全て取得する記述
    serializer_class = serializers.ProfileSerializer

    # ユーザーIDを作成したプロフィールに格納する記述
    def perform_create(self, serializer):
        serializer.save(companyProfile=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    # 自身のプロフィールのみをfilteringして表示する記述
    def get_queryset(self):
        return self.queryset.filter(companyProfile=self.request.user)


class Dog_DataViewSet(viewsets.ModelViewSet):
    queryset = Dog_Data.objects.all()
    serializer_class = serializers.Dog_DataSerializer

    def perform_create(self, serializer):
        serializer.save(companyProfile=self.request.user)
