from django.contrib import admin
from .models import SiteSettings, UserProfile
# Register your models here.

admin.site.register(SiteSettings)
admin.site.register(UserProfile)