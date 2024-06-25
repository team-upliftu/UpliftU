from rest_framework import serializers
from users.models import CustomUser
from django.contrib.auth.hashers import make_password 


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','email', 'user_name', 'is_staff','is_active','profile', 'color']

    def validate_password(self, value: str) -> str:
        """
        ハッシュ値に変換する
        """
        return make_password(value)