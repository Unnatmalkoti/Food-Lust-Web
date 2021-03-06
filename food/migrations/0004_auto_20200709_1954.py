# Generated by Django 2.0.2 on 2020-07-09 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0003_order_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='paymentMethod',
            field=models.CharField(choices=[('C', 'Cash On Delivery'), ('P', 'Paytm')], default='C', max_length=1),
            preserve_default=False,
        ),
    ]
