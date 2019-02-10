from django.db import models

# Create your models here.


class Power(models.Model):
    voltage = models.DecimalField(max_digits=5, decimal_places=3)
    ampere = models.DecimalField(max_digits=5, decimal_places=3)
    power = models.DecimalField(max_digits=5, decimal_places=3)
