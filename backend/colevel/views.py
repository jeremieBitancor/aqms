from rest_framework import generics
from .models import Colevel
from .serializers import ColevelSerializer
from django.db.models import Avg

from django_filters import rest_framework as filters
from colevel.models import Colevel


class ColevelFilter(filters.FilterSet):

    # ppm_max = filters.NumberFilter(field_name='ppm', lookup_expr='gte')
    # ppm_min = filters.NumberFilter(field_name='ppm', lookup_expr='lte')

    time_min = filters.TimeFilter(field_name='time', lookup_expr='gte')
    time_max = filters.TimeFilter(field_name='time', lookup_expr='lte')

    class Meta:
        model = Colevel
        fields = ['time_max', 'date', 'time_min']


class ColevelListView(generics.ListCreateAPIView):
    queryset = Colevel.objects.all()
    serializer_class = ColevelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    # filter_fields = ('time', 'date')
    filter_class = ColevelFilter

    # def get_queryset(self):
    #     queryset = Colevel.objects.all()
    #     date = self.request.query_params.get('date', None)
    #     time = self.request.query_params.get('time', None)
    #     if date is not None:
    #         queryset = queryset.filter(
    #             date=date, time__contains=time)
    #     return queryset

    # queryset = Colevel.objects.filter(
    #     time__contains=15).aggregate(Avg('ppm'))
    # return queryset

    # def get_queryset(self):
    #     queryset = Colevel.objects.all()
    #     #queryset = Colevel.objects.all().aggregate(Avg('ppm'))
    #     return queryset
