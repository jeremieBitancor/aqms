from django.shortcuts import render

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from aqms.models import Aqms
from aqms.serializers import PowerSerializer, WindspeedSerializer, AqmsSerializer, ColevelSerializer
# Create your views here.


class AqmsListCreateView(generics.ListCreateAPIView):
    queryset = Aqms.objects.all()
    serializer_class = AqmsSerializer


class PowerListView(generics.ListAPIView):
    queryset = Aqms.objects.all()
    serializer_class = PowerSerializer


class WindspeedListView(generics.ListAPIView):
    queryset = Aqms.objects.all()
    serializer_class = WindspeedSerializer


class ColevelListView(generics.ListAPIView):
    queryset = Aqms.objects.all()
    serializer_class = ColevelSerializer

# class ColevelListCreateView(generics.ListCreateAPIView):
#     queryset = Colevel.objects.all()
#     serializer_class = ColevelSerializer


class AqmsLatestView(APIView):
    def get(self, request, format=None):
        queryset = Aqms.objects.latest('date_time')
        serializer_class = AqmsSerializer(queryset, many=False)
        return Response(serializer_class.data)


# class ColevelLatestView(APIView):
#     def get(self, request, format=None):
#         queryset = Colevel.objects.latest('date_time')
#         serializer_class = ColevelSerializer(queryset, many=False)
#         return Response(serializer_class.data)
