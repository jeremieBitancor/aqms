from django.db import models

# Create your models here.


class Aqms(models.Model):
    ppm = models.DecimalField(max_digits=5, decimal_places=2)
    voltage = models.DecimalField(max_digits=5, decimal_places=3)
    ampere = models.DecimalField(max_digits=5, decimal_places=3)
    watts = models.DecimalField(max_digits=5, decimal_places=3)
    windspeed = models.SmallIntegerField()
    date_time = models.DateTimeField(auto_now_add=True)
