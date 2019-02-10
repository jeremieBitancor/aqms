from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Colevel
from .serializers import ColevelSerializer, AveColevelSerializer
from django.db.models import Avg, Count

from django_filters import rest_framework as filters
from colevel.models import Colevel

from django.db.models.functions import ExtractHour, ExtractWeek


class ColevelFilter(filters.FilterSet):

    # time_min = filters.TimeFilter(field_name='time', lookup_expr='gte')
    # time_max = filters.TimeFilter(field_name='time', lookup_expr='lte')

    date_min = filters.DateFilter(field_name='date', lookup_expr='gte')
    date_max = filters.DateFilter(field_name='date', lookup_expr='lte')

    class Meta:
        model = Colevel
        # fields = ['date', 'time_min', 'time_max']
        fields = ['date']


class ColevelListView(generics.ListCreateAPIView):
    queryset = Colevel.objects.all()
    serializer_class = ColevelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ColevelFilter


class ColevelAveListView(generics.ListAPIView):

    # queryset = Colevel.objects.values('date', hour=ExtractHour(
    #     'time'), week=ExtractWeek('date')).annotate(ave_ppm=Avg('ppm')).order_by('date')

    queryset = Colevel.objects.values('date', hour=ExtractHour(
        'time')).annotate(ave_ppm=Avg('ppm')).order_by('date')

    serializer_class = AveColevelSerializer
    filter_backends = (filters.DjangoFilterBackend, )
    filter_class = ColevelFilter
