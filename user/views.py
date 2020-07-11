from django.shortcuts import render
from food.models import Order
from django.contrib.auth.decorators import login_required
# Create your views here.
@login_required
def my_orders_view(request):
    context = {
        'orders': Order.objects.filter(user = request.user, ordered= True).order_by("-placed_at")
    }
    return render(request, "users/my-orders.html", context)

@login_required()
def order_details(request, pk):

    order = get_object_or_404(Order, pk=pk)
    site_settings = SiteSettings.objects.all().first()
    context = {
        'order': order,
        'settings': site_settings
    }
    return render(request, 'user/order_details.html',context)