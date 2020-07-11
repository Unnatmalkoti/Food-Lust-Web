from rest_framework import serializers
from .models import FoodItem, CartItem, Order
from django.utils import timezone
from user.models import SiteSettings


class FoodItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FoodItem
        fields = "__all__"

class CartItemSerializer(serializers.ModelSerializer):
    quantity= serializers.IntegerField(required=True)
    item = FoodItemSerializer()

    class Meta:
        model = CartItem
        fields = "__all__"


class CartItemCreateSerializer(serializers.ModelSerializer):
    
    quantity= serializers.IntegerField(required=True)
    item = serializers.PrimaryKeyRelatedField(queryset=FoodItem.objects.all())

    class Meta:
        model = CartItem
        fields = "__all__"

    def create(self, validated_data):
        # breakpoint()
        
        qty = validated_data['quantity']
        item = validated_data['item']
        request = self.context['request']
        order_qs = Order.objects.filter(user = request.user, ordered= False)
        if order_qs.exists():
            order = order_qs.first()


            #checking if order item already exists
            order_item_qs = order.items.filter(item = item)
            if order_item_qs.exists():
                order_item = order_item_qs[0]
                order_item.quantity = qty
                if qty ==  0:
                    order_item.delete()
                else:
                    order_item.save()
                return order_item
            else :
                if qty > 0:
                    cart_item = CartItem.objects.create(item = item, quantity = qty)
                    order.items.add(cart_item)
                    order.save()
                    return cart_item
        else :
            if qty >0 : 
                cart_item = CartItem.objects.create(item = item, quantity= qty)
                order = Order(user=request.user)
                order.created_at = timezone.now()
                order.save()
                order.items.add(cart_item)
                order.save()
                return cart_item
        return CartItem()

class OrderSerializer(serializers.ModelSerializer):
    tax_percentage = serializers.ReadOnlyField()
    full_status = serializers.SerializerMethodField()
    items= CartItemCreateSerializer(many=True, read_only = True)
    class Meta: 
        read_only_fields = ('id', 'user', 'ordered', 'placed_at', 'items', 'status')
        fields = "__all__"
        model = Order
    
    def get_full_status(self, obj):
        return obj.get_status_display()

    

    def update (self, instance, validated_data):
        # breakpoint()
        instance.address_line1 = validated_data['address_line1']
        instance.address_line2 = validated_data['address_line2']
        instance.pincode = validated_data['pincode']
        instance.paymentMethod = validated_data['paymentMethod']
        instance.instruction = validated_data['instructions']

        instance.save()
        return instance

