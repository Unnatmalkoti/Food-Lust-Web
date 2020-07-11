"""foodLust URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework import routers
from .api import FoodItemViewSet, CartItemViewSet, CartView, OrderListView, PlaceOrder, success_response
# from .views import Home, failure, success

router = routers.DefaultRouter()

router.register('api/food', FoodItemViewSet, 'food-items')
# router.register('api/cart-items', CartItemViewSet, 'cart-items')

urlpatterns = [
    path('api/cart-items/', CartView.as_view(), name="cart-items"),
    path('api/my-orders', OrderListView.as_view(), name="my-orders"),   
    path('api/place_order', PlaceOrder.as_view()),
    path('api/payment/success', success_response),
    # path('api/payment/fail', failure ),
    ] + router.urls
