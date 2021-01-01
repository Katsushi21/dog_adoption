from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from . import serializers
from .models import Profile, Dog_Data


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(company_profile=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(company_profile=self.request.user)


class Dog_DataViewSet(viewsets.ModelViewSet):
    queryset = Dog_Data.objects.all()
    serializer_class = serializers.Dog_DataSerializer

    def perform_create(self, serializer):
        serializer.save(company_post=self.request.user)
