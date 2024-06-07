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

from app.views.genre import GenreViewSet
from app.views.gathering import GatheringViewSet, GatheringViewSetV2
from app.views.ownership import OwnershipViewSet
from app.views.message import MessageViewSet, MessageLogsViewSet
from app.views.participation import ParticipationViewSet
from app.views.user import CustomUserViewSet
from app.views.getflowercolor import GetFlowerColorViewSet, GetFlowerColorViewSet_v2
from app.views import delete_my_participation, close_gathering
from app.views.getcurrentgathering import GetCurrentGatheringViewSet

router = routers.DefaultRouter()
router.register('genres', GenreViewSet)
router.register('gatherings',GatheringViewSet)
router.register('ownerships',OwnershipViewSet)
router.register('messages',MessageViewSet)
router.register('participations',ParticipationViewSet)
router.register('users',CustomUserViewSet)
router.register('messagelogs',MessageLogsViewSet, basename='messagelogs')
router.register('getflowercolordetail',GetFlowerColorViewSet, basename='getflowercolordetail')
router.register('getflowercolor',GetFlowerColorViewSet_v2, basename='getflowercolor')
router.register('gatheringsv2',GatheringViewSetV2, basename='gatheringsv2')
router.register('getcurrentgathering',GetCurrentGatheringViewSet, basename='getcurrentgathering')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth.urls')),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/',include('djoser.urls.jwt')),
    path('', include(router.urls)),
    path('deletemyparticipation/<int:user_id>', delete_my_participation, name='delete_my_participation'),
    path('closegathering/<str:gathering_id>', close_gathering, name='close_gathering'),
]
