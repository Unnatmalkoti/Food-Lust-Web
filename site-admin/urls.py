
from .views import all_orders_view, change_order_status, order_details, user_list, food_list_view, food_detail_view, food_create_view, food_update_view
from .delivery import deliveries_view
from django.contrib import admin, auth

from django.urls import path, include

urlpatterns = [    
    path('all-orders/', all_orders_view, name='all-orders'),
    path('change-order-status/', change_order_status, name='change-order-status'),
    path('order-details/<int:pk>', order_details, name="order-details"),
    path('deliveries/', deliveries_view, name='deliveries'),
    path('food-items/',food_list_view , name="admin-foodlist" ),
    path('food-items/<int:pk>/',food_detail_view , name="admin-foodlist"),  
    path('food-items/create/', food_create_view ,name="admin-food-create"),
    path('food-items/<int:pk>/update/', food_update_view ,name="admin-food-update"),
    path('users/', user_list, name="admin-userlist" )
]