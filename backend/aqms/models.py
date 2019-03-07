from django.db import models

# Create your models here.


class PowerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(wat_pz__gt=0, wat_wt__gt=0)


class Aqms(models.Model):
    ppm = models.DecimalField(max_digits=6, decimal_places=3)

    vol_pz = models.DecimalField(max_digits=6, decimal_places=3)
    amp_pz = models.DecimalField(max_digits=6, decimal_places=3)
    wat_pz = models.DecimalField(max_digits=6, decimal_places=3)

    vol_wt = models.DecimalField(max_digits=6, decimal_places=3)
    amp_wt = models.DecimalField(max_digits=6, decimal_places=3)
    wat_wt = models.DecimalField(max_digits=6, decimal_places=3)

    windspeed = models.SmallIntegerField()
    date_time = models.DateTimeField(auto_now_add=True)
    # date = models.DateField(auto_now_add=True)
    # time = models.TimeField(auto_now_add=True)

    objects = models.Manager()
    nonzero_objects = PowerManager()

# class Colevel(models.Model):
#     ppm = models.DecimalField(max_digits=5, decimal_places=2)
#     date_time = models.DateTimeField(auto_now_add=True)
