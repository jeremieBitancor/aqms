from django.shortcuts import render
from windspeed.models import Windspeed
from .serializers import WindspeedSerializer, AveWindspeedSerializer, LatestWindspeedSerializer
from django.db.models.functions import ExtractHour
from django.db.models import Avg
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class WindspeedListView(generics.ListCreateAPIView):
    queryset = Windspeed.objects.all()
    serializer_class = WindspeedSerializer


class WindspeedAveListView(generics.ListAPIView):
    queryset = Windspeed.objects.values('date', hour=ExtractHour('time')).annotate(
        ave_speed=Avg('speed')).order_by('date')
    serializer_class = AveWindspeedSerializer


class LatestWindspeedView(APIView):
    def get(self, request, format=None):
        queryset = Windspeed.objects.latest('date', 'time')
        serializer = LatestWindspeedSerializer(queryset, many=False)
        return Response(serializer.data)
