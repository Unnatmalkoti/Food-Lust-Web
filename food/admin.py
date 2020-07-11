from django.contrib import admin
from food.models import CartItem,FoodItem,Order

# Register your models here.

admin.site.register(CartItem)
admin.site.register(FoodItem)
admin.site.register(Order)
