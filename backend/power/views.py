from django.shortcuts import render
from power.models import Power
from .serializers import PowerSerializer, AvePowerSerializer
from rest_framework import generics
# Create your views here.
from django.db.models.functions import ExtractHour, ExtractWeek
from django.db.models import Avg


class PowerListView(generics.ListCreateAPIView):
    queryset = Power.objects.all()
    serializer_class = PowerSerializer


class PowerAveListView(generics.ListAPIView):
    queryset = Power.objects.values(hour=ExtractHour(
        'time')).annotate(ave_watts=Avg('watts'), ave_voltage=Avg('voltage'), ave_ampere=Avg('ampere')).order_by(
            'date')
    serializer_class = AvePowerSerializer
