from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from user.models import SiteSettings
from payu.models import Transaction

foodCatergoryChoices = (
    ('GY', 'Gym Food'),
    ('BR', 'Breakfast')
)

# Create your models here.
class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField( blank=True, null=True)
    image = models.ImageField(blank= False, null =True, upload_to="food-images")
    price = models.DecimalField(max_digits=10, decimal_places =1)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True, blank=False, null=False)
    category = models.CharField(max_length=2, choices=foodCatergoryChoices, null=True)
    
    def __str__(self):
        return self.name


class CartItem(models.Model):
    item = models.ForeignKey(FoodItem, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveSmallIntegerField(default=1)
    def __str__(self):
        return self.item.name
    @property
    def total_cost(self):
        return self.quantity * self.item.price

payment_choices = (('C', 'Cash On Delivery'),
('P', 'Paytm'),
)

order_status_choices = (
    ('N', 'New'),
    ('C', 'Cooking'),
    ('W', 'Ready'),
    ('IT', 'In-transit'),
    ('D', 'Delivered'),
    ('CBU', 'Canceled by User'),
    ('CBA', 'Canceled by Admin')
)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    items = models.ManyToManyField(CartItem)
    created_at = models.DateTimeField(auto_now_add=True)
    placed_at = models.DateTimeField(null=True, blank=True)

    # AddressDetails

    address_line1 = models.CharField(max_length=500, blank=True, null=True)
    address_line2 = models.CharField(max_length=500, blank=True, null=True)
    pincode = models.CharField(max_length=8, blank=True, null=True)
    instructions = models.TextField(null=True, blank=True)
    
    paymentMethod = models.CharField(max_length=1, choices =payment_choices)
    payment = models.OneToOneField(Transaction,on_delete=models.SET_NULL,  blank=True, null = True)
    total = models.DecimalField(max_digits=10, decimal_places=1, blank=True, null=True)
    # mobile_no = models.numberField()

    status = models.CharField(max_length=3,blank=True, null=True, choices = order_status_choices)

    
    def order(self):
        self.total = self.get_total()
        self.placed_at = timezone.now()
        # breakpoint()
        self.ordered = True        
        self.status='N'
        self.save()

    def get_pretotal(self):
        pretotal =0
        for item in self.items.all() : 
            pretotal += item.item.price * item.quantity
        return pretotal


    def get_total(self):
        if self.ordered:
            return self.total
        else:
            total = self.get_pretotal()
            total += self.get_calculated_tax()
        return total

    def get_calculated_tax(self):
        pretotal = self.get_pretotal()
        site_settings = SiteSettings.objects.all().first()
        tax = site_settings.tax * pretotal / 100
        return tax
        
    @property
    def tax_percentage(self):
        site_settings = SiteSettings.objects.all().first()
        return site_settings.tax 


# class OrderAddress(models.Model):
