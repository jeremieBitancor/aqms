from rest_framework import serializers
from colevel.models import Colevel
from django.db.models import Avg
from django.db.models.fields import DecimalField, DateField, TimeField, IntegerField


class ColevelSerializer(serializers.Serializer):

    ppm = serializers.DecimalField(max_digits=5, decimal_places=2)
    date = serializers.DateField()
    time = serializers.TimeField(format='%H:%M')
    #aveppm = serializers.IntegerField()

    # class Meta:
    # model = Colevel
    #     fields = ('ppm', "date", "time",)
