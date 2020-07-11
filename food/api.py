from .models import FoodItem, CartItem, Order
from rest_framework import views, viewsets, permissions, generics, response, status
from .serializers import FoodItemSerializer, CartItemCreateSerializer, OrderSerializer
from django.http import HttpResponse
from payu.gateway import get_hash,payu_url, check_hash, get_transaction
from uuid import uuid4
from django.views.decorators.csrf import csrf_protect, csrf_exempt


class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FoodItemSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemCreateSerializer   
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return CartItem.objects.all()

class CartView(generics.ListCreateAPIView):
    serializer_class = CartItemCreateSerializer
    permission_classes= [permissions.IsAuthenticated]
    queryset = CartItem.objects.all()

    def list(self, request):
        order = Order.objects.filter(user= request.user, ordered=False).first()
        qs = None
        if(order):
            qs = order.items.all()
        serializer = CartItemCreateSerializer(qs, many=True)
        return response.Response(serializer.data)


class OrderListView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()

    def list(self, request):
        qs= self.get_queryset()
        qs = qs.filter(user = request.user, ordered=True)
        serializer = OrderSerializer(qs, many=True)

        return response.Response(serializer.data)

    def create(self,request):
        order = Order.objects.filter(user= request.user, ordered=False).first()
        if(order):
            serializer = OrderSerializer(order, data=request.data)

            # breakpoint()
            if(serializer.is_valid(raise_exception=True)):
                order = serializer.save()
                order.order()
                return response.Response(serializer.data)        
        return response.Response({'message': 'No items to place order for'},status=status.HTTP_404_NOT_FOUND)
        
## Place Order : 
class PlaceOrder(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request,format = None):
        order = Order.objects.filter(user= request.user, ordered=False).first()
        
        if(order and order.items.exists):
            total = order.get_total()
            serializer = OrderSerializer(order, data=request.data)
            
            if(serializer.is_valid(raise_exception=True)):
                order = serializer.save()
                if(order.paymentMethod == 'P'):
                    txnid = uuid4().hex

                    data = {
                    'txnid':txnid, 'amount':float(total), 'productinfo': 'Food',
                    'firstname': request.user.username, 'email': request.user.email
                    }

                    hash_value = get_hash(data)
                    return response.Response({
                        'order' : serializer.data,
                        'hash': hash_value,
                        'amount': total,
                        'txnid': txnid,
                        'paymentURL' : payu_url(),
                        'paymentMethod': 'P'
                    })

                else :
                    order.order()
                    return response.Response({
                        "order": serializer.data,
                        paymentMethod: "C"})        

        return response.Response({'message': 'No items to place order for'},status=status.HTTP_404_NOT_FOUND)

        

@csrf_exempt
def success_response(request):
    hash_value = check_hash(request.POST)

    if check_hash(request.POST):
        transaction = get_transaction(request.POST)
        transaction.order.order()
        return HttpResponse("Order Placed")
    else :
        return HttpResponse("Transaction Failed!")

    

