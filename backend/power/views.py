from django.shortcuts import render
from power.models import Power
from .serializers import PowerSerializer, AvePowerSerializer, LatestPowerSerializer
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
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


class LatestPowerView(APIView):

    def get(self, request, format=None):

        queryset = Power.objects.latest('date', 'time')
        serializer = LatestPowerSerializer(queryset, many=False)

        return Response(serializer.data)
