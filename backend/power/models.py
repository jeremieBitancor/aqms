from django.db import models

# Create your models here.


class Power(models.Model):
    voltage = models.DecimalField(max_digits=5, decimal_places=3)
    ampere = models.DecimalField(max_digits=5, decimal_places=3)
    watts = models.DecimalField(max_digits=5, decimal_places=3)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
