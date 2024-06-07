from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Custom User Model Manager where email is the unique identifier for authentication.
    """

    def create_user(self, email, password, user_name, **extra_fields):
        """
        Create and save a user with the given email address, date of birth, country and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email,user_name=user_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, user_name, **extra_fields):
        """
        Create and save a superuser with the given email address and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, password, user_name=user_name,
                                **extra_fields)
