from rest_framework import serializers
from aqms.models import Aqms, Colevel
from django.db.models.fields import DecimalField, IntegerField


class PowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = ('watts', 'ampere', 'voltage',
                  'date_time')


class WindspeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = ('date_time', 'windspeed')


class ColevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colevel
        fields = ('ppm', 'date_time')


class AqmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = '__all__'
