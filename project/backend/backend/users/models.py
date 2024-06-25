from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Group, Permission
from django.db import models
from .managers import CustomUserManager

import uuid
import random

def random_color_generator():
    return "#" + "".join([random.choice("0123456789ABCDEF") for j in range(6)])

class CustomUser(AbstractBaseUser, PermissionsMixin):

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    email = models.EmailField(max_length=255, unique=True)
    user_name = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('user_name', )

    is_staff = models.BooleanField(
        default=False,
    )
    is_active = models.BooleanField(
        default=True,
    )

    objects = CustomUserManager()

    profile = models.CharField(max_length=1024, blank=True, null=True)
    color = models.CharField(max_length=10, default=random_color_generator)

    # groupsとuser_permissionsフィールドを追加し、related_nameを指定
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # ここでrelated_nameを指定
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions '
                   'granted to each of their groups.'),
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # ここでrelated_nameを指定
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

    def __str__(self) -> str:
        return self.email
