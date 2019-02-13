from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Colevel
from .serializers import ColevelSerializer, AveColevelSerializer, LatestColevelSerializer
from django.db.models import Avg, Count

from django_filters import rest_framework as filters
from colevel.models import Colevel

from django.db.models.functions import ExtractHour, ExtractWeek


class ColevelFilter(filters.FilterSet):

    time_min = filters.TimeFilter(field_name='time', lookup_expr='gte')
    time_max = filters.TimeFilter(field_name='time', lookup_expr='lte')

    class Meta:
        model = Colevel
        fields = ['date', 'time_min', 'time_max']


class ColevelListView(generics.ListCreateAPIView):
    queryset = Colevel.objects.all()
    serializer_class = ColevelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ColevelFilter


class ColevelAveListView(generics.ListAPIView):

    # queryset = Colevel.objects.values('date', hour=ExtractHour(
    #     'time'), week=ExtractWeek('date')).annotate(ave_ppm=Avg('ppm')).order_by('date')

    queryset = Colevel.objects.values(hour=ExtractHour(
        'time')).annotate(ave_ppm=Avg('ppm')).order_by('date')

    serializer_class = AveColevelSerializer


class LatestColevelView(APIView):
    def get(self, request, format=None):
        queryset = Colevel.objects.latest('date', 'time')
        serializer = LatestColevelSerializer(queryset, many=False)
        return Response(serializer.data)
