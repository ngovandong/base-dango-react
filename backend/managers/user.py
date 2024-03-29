from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    def get_admin_user(self):
        return self.first(is_superuser=True)

    def get_by_email(self, email):
        return self.filter(email=email).first()

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user.py with the given email, and password.
        """
        if not email:
            raise ValueError("The given username must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)
