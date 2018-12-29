from rest_framework import serializers
from colevel.models import Colevel
from django.db.models import Avg


class ColevelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Colevel
        fields = ("ppm", "date", "time")
