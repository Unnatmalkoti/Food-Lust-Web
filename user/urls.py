from django.urls import path, include
from .views import my_orders_view, order_details
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
urlpatterns = [
    path('auth/', include('knox.urls')),
    path('auth/register', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('my-orders/', my_orders_view, name="my-orders"),
    path('order-details/', order_details, name="order-details"),
]
