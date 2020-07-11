from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class SiteSettings(models.Model):
    tax = models.PositiveIntegerField()

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_delivery_guy = models.BooleanField(default=False)
    profile_picuture = models.ImageField(upload_to="user-profile")