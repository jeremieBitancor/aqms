from django.db import models
# Create your models here.


class Colevel(models.Model):
    ppm = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
