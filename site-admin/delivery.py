from django.shortcuts import render, get_object_or_404, redirect
from django.core.exceptions import PermissionDenied
from django.contrib.auth.decorators import user_passes_test
from food.models import Order
from user.models import UserProfile

def is_delivery_guy(user):
    # breakpoint()
    profile_qs = UserProfile.objects.filter(user= user)
    if profile_qs.exists():
        profile = profile_qs.first()
        return profile.is_delivery_guy
    else:
        # breakpoint()
        return False

def deliveries_view(request):

    if is_delivery_guy(request.user) :

        orders =  {
            'New' : Order.objects.filter(status='N'),
            'Cooking' : Order.objects.filter(status='C'),
            'Waiting for Pickup' : Order.objects.filter(status='W'),
            'In Transit' : Order.objects.filter(status='IT'),
            'Delivered' : Order.objects.filter(status='D'),
            'Canceled' : Order.objects.filter(status__in = ['CBU', 'CBA'])
        }

        context = { 
            'orders': orders,
            'all_orders' : Order.objects.all(),

        }
        return render(request, 'site-admin/delivery_dashboard.html', context)
    else:
        raise PermissionDenied