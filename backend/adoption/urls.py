from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, ManageUserView, Dog_DataViewSet

router = routers.DefaultRouter()
router.register('dog_data', Dog_DataViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('myself/', ManageUserView.as_view(), name='myself'),
    path('', include(router.urls))
]
