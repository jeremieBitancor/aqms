from django.db import models

# Create your models here.


class Windspeed(models.Model):
    speed = models.SmallIntegerField()
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
