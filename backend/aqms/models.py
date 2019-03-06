from django.db import models

# Create your models here.


class PowerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(wat_pz__gt=0, wat_wt__gt=0)


class Aqms(models.Model):
    ppm = models.FloatField()

    vol_pz = models.FloatField()
    amp_pz = models.FloatField()
    wat_pz = models.FloatField()

    vol_wt = models.FloatField()
    amp_wt = models.FloatField()
    wat_wt = models.FloatField()

    windspeed = models.SmallIntegerField()
    date_time = models.DateTimeField(auto_now_add=True)
    # date = models.DateField(auto_now_add=True)
    # time = models.TimeField(auto_now_add=True)

    objects = models.Manager()
    nonzero_objects = PowerManager()

# class Colevel(models.Model):
#     ppm = models.DecimalField(max_digits=5, decimal_places=2)
#     date_time = models.DateTimeField(auto_now_add=True)
