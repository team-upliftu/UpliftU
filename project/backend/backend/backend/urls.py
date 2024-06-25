"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from app.views.receiver import ReceiverViewSet
# from app.views.hobbies import HobbiesViewSet
from app.views.message import MessageViewSet
from app.views.project import ProjectViewSet
from app.views.giftHistory import GiftHistoryViewSet
from app.views.user import CustomUserViewSet


router = routers.DefaultRouter()
router.register('receiver', ReceiverViewSet)
# router.register('hobbies',HobbiesViewSet)
router.register('message',MessageViewSet)
router.register('project',ProjectViewSet)
router.register('giftHistory',GiftHistoryViewSet)
router.register('users',CustomUserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/auth/', include('auth.urls')),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('', include(router.urls)),
]
