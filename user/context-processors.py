from django.contrib.auth.models import User
from .models import UserProfile

def user_profile(request):
    if request.user.is_authenticated :
        user_profile = UserProfile.objects.filter(user= request.user).first()
        return {'user_profile': user_profile }
    return {}