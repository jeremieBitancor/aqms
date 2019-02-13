from rest_framework import serializers
from windspeed.models import Windspeed
from django.db.models.fields import IntegerField


class WindspeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Windspeed
        fields = '__all__'


class AveWindspeedSerializer(serializers.Serializer):
    ave_speed = serializers.IntegerField()
    hour = serializers.IntegerField()


class LatestWindspeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Windspeed
        fields = ('speed', 'time', 'date')
