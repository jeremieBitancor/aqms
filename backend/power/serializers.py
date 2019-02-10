from rest_framework import serializers
from power.models import Power


class PowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Power
        fields = ('watts', 'ampere', 'voltage', 'date', 'time')
