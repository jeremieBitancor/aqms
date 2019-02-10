from django.shortcuts import render
from power.models import Power
from .serializers import PowerSerializer
from rest_framework import generics
# Create your views here.


class PowerListView(generics.ListCreateAPIView):
    queryset = Power.objects.all()
    serializer_class = PowerSerializer
