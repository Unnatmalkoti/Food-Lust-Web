# Generated by Django 2.0.2 on 2020-07-09 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payu', '0001_initial'),
        ('food', '0002_auto_20200625_1823'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='payment',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='payu.Transaction'),
        ),
    ]