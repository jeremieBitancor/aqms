from rest_framework import serializers
from power.models import Power
from django.db.models.fields import DecimalField, IntegerField


class PowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Power
        fields = ('watts', 'ampere', 'voltage', 'date', 'time')


class AvePowerSerializer(serializers.Serializer):
    ave_watts = serializers.DecimalField(max_digits=5, decimal_places=3)
    ave_ampere = serializers.DecimalField(max_digits=5, decimal_places=3)
    ave_voltage = serializers.DecimalField(max_digits=5, decimal_places=3)
    hour = serializers.IntegerField()
