from django.urls import path

from .views import LoginView, LogoutView, RefreshTokenView, TokenVerifyView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("refresh/", RefreshTokenView.as_view(), name="token_refresh"),
]