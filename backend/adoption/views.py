from django.shortcuts import render

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from .models import Dog_Data
from .serializers import Dog_DataSerializer, UserSerializer
from .ownpermissions import ProfilePermission


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (ProfilePermission,)


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class Dog_DataViewSet(viewsets.ModelViewSet):
    queryset = Dog_Data.objects.all()
    serializer_class = Dog_DataSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
