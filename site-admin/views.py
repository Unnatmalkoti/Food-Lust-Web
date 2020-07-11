from django.shortcuts import render
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, response
from django.contrib.auth.decorators import user_passes_test, login_required

# Create your views here. 
from .forms import FoodItemForm
from food.models import Order, FoodItem
from user.models import SiteSettings, UserProfile
from .delivery import is_delivery_guy

def all_orders_view(request):
    
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
    return render(request, 'site-admin/all_orders.html', context)

def change_order_status(request):
    
    if request.is_ajax() or request.POST:
        order = Order.objects.filter(ordered=True, pk=request.POST['pk']).first()
        if request.user.is_superuser:
            order.status = request.POST['status']
            order.save()
            
        elif is_delivery_guy(request.user):
            if order.status in ["W", "IT"] :
                order.status = order.next_status()
                order.save()

    return redirect('all-orders')


@login_required()
def order_details(request, pk):

    order = get_object_or_404(Order, pk=pk)
    site_settings = SiteSettings.objects.all().first()
    context = {
        'order': order,
        'settings': site_settings
    }
    return render(request, 'site-admin/order_details.html' ,context)


def user_list(request):
    context = {
        'users' : User.objects.all(),
    }

    if request.method == "POST"  and request.user.is_superuser:
        pk = request.POST['user_pk']
        status = request.POST['status']
        user = get_object_or_404(User, pk= pk)
        user.is_superuser = False

        user_profile_qs = user.userprofile_set.all()
        if user_profile_qs.exists():
            user_profile = user_profile_qs.first()
            
        else:
            user_profile = UserProfile(user=user)
        user_profile.is_delivery_guy = False

        if status == 'admin':
            user.is_superuser = True
        elif status == 'delivery_guy':
            user_profile.is_delivery_guy = True
        
        user.save()
        user_profile.save()

    return render(request, 'site-admin/users.html', context )

def food_list_view(request):
    context = {
        "food_items": FoodItem.objects.all()
    }
    return render(request, 'site-admin/food-item-list.html',context)

def food_detail_view(request, pk):
    context = {
        "item": get_object_or_404(FoodItem, pk=pk)
    }
    return render(request, 'site-admin/food-item-detail.html',context)

def food_create_view(request):
    
    form = FoodItemForm()
    if request.POST :
        form = FoodItemForm(request.POST)
        if form.is_valid() :
            obj = form.save()
            return redirect('admin-foodlist', obj.pk)
    context = {
        "form": form
    }
    return render(request, 'site-admin/food-item-create.html',context)

def food_update_view(request, pk):
    instance = get_object_or_404(FoodItem, pk= pk)
    form = FoodItemForm(instance = instance)

    if request.POST :
        form = FoodItemForm(request.POST or None, request.FILES or None, instance = instance)
        if form.is_valid() :
            obj = form.save()
            return redirect('admin-foodlist', obj.pk)
    context = {
        "form": form, 
        "item" : instance,
    }
    return render(request, 'site-admin/food-item-create.html',context)