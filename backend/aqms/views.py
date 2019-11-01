from django_filters import rest_framework as filters
from django.db.models.functions import ExtractHour, ExtractYear, ExtractWeek, ExtractMonth, ExtractWeekDay, ExtractDay, TruncDate, TruncTime
from django.db.models import Avg, F, Sum
from django.shortcuts import render

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from aqms.models import Aqms
from aqms.serializers import AqmsListSerializer, PowerSerializer, WindspeedSerializer, AqmsSerializer, AqmsLatestSerializer, ColevelSerializer, PowerAveSerializer, PowerHourlySerializer, PowerDailySerializer, PowerWeeklySerializer, WindHourlySerializer, WindDailySerializer, WindWeeklySerializer, CoHourlySerializer, CoDailySerializer, CoWeeklySerializer
#  Create your views here.


class DateFilter(filters.FilterSet):
    day = filters.CharFilter(field_name='day', lookup_expr='iexact')
    year = filters.CharFilter(field_name='year', lookup_expr='iexact')
    week = filters.CharFilter(field_name='week', lookup_expr='iexact')
    month = filters.CharFilter(field_name='month', lookup_expr='iexact')
    date = filters.CharFilter(field_name='date', lookup_expr='iexact')
    hour = filters.CharFilter(field_name='hour', lookup_expr='iexact')

    class Meta:
        # models = Aqms
        fields = ['day', 'year', 'week', 'month', 'date']


class AqmsListCreateView(generics.ListCreateAPIView):
    queryset = Aqms.objects.all()
    serializer_class = AqmsSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class AqmsListView(generics.ListAPIView):
    queryset = Aqms.objects.all().annotate(
        date=TruncDate('date_time'), hour=ExtractHour('date_time'), time=TruncTime('date_time')).order_by('-id')
    serializer_class = AqmsListSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class PowerListView(generics.ListAPIView):
    queryset = Aqms.objects.all()
    serializer_class = PowerSerializer


class WindspeedListView(generics.ListAPIView):
    queryset = Aqms.objects.all()
    serializer_class = WindspeedSerializer


class ColevelListView(generics.ListAPIView):
    queryset = Aqms.objects.all()
    serializer_class = ColevelSerializer


class PowerAveListView(generics.ListAPIView):
    queryset = Aqms.nonzero_objects.values(hour=ExtractHour('date_time'), week=ExtractWeek(
        'date_time'), month=ExtractMonth('date_time')).annotate(ave_wat_pz=Avg('wat_pz'), ave_wat_wt=Avg('wat_wt'), ave_wat_all=Avg(F('wat_wt')+F('wat_pz')))
    serializer_class = PowerAveSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class PowerHourlyAveListView(generics.ListAPIView):
    # queryset = Aqms.nonzero_objects.values(hour=ExtractHour(
    #     'date_time'), day=ExtractDay('date_time'), month=ExtractMonth('date_time'), year=ExtractYear('date_time')).annotate(ave_wat_pz=Avg('wat_pz'), ave_wat_wt=Avg('wat_wt'), ave_wat_all=Avg(F('wat_wt')+F('wat_pz'))).order_by('hour')
    queryset = Aqms.nonzero_objects.values(hour=ExtractHour('date_time'), day=ExtractDay('date_time'), month=ExtractMonth(
        'date_time'), year=ExtractYear('date_time')).annotate(ave_vol_wt=Avg('vol_wt'), ave_amp_wt=Avg('amp_wt'), ave_vol_pz=Avg('vol_pz'), ave_amp_pz=Avg('amp_pz'), t_wat_pz=Avg('wat_pz'), t_wat_wt=Avg('wat_wt'), t_wat_all=Avg(F('wat_pz')+F('wat_wt'))).order_by('hour')

    # queryset = Aqms.nonzero_objects.values(hour=ExtractHour('date_time'), date=TruncDate('date_time')).annotate(
    #     t_wat_pz=Avg('wat_pz'), t_wat_wt=Avg('wat_wt'), t_wat_all=Avg(F('wat_pz')+F('wat_wt'))).order_by('hour')
    serializer_class = PowerHourlySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class PowerDailyAveListView(generics.ListAPIView):
    # queryset = Aqms.nonzero_objects.values(
    #     week=ExtractWeek('date_time'), weekday=ExtractWeekDay('date_time')).annotate(ave_wat_pz=Avg('wat_pz'), ave_wat_wt=Avg('wat_wt'), ave_wat_all=Avg(F('wat_wt')+F('wat_pz'))).order_by('weekday')
    queryset = Aqms.nonzero_objects.values(week=ExtractWeek('date_time'), weekday=ExtractWeekDay('date_time')).annotate(
        t_wat_pz=Avg('wat_pz'), t_wat_wt=Avg('wat_wt'), t_wat_all=Avg(F('wat_pz')+F('wat_wt'))).order_by('weekday')
    serializer_class = PowerDailySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class PowerWeeklyAveListView(generics.ListAPIView):
    # queryset = Aqms.nonzero_objects.values(month=ExtractMonth(
    #     'date_time'), week=ExtractWeek('date_time'), year=ExtractYear('date_time')).annotate(ave_wat_pz=Avg('wat_pz'), ave_wat_wt=Avg('wat_wt'), ave_wat_all=Avg(F('wat_wt')+F('wat_pz'))).order_by('week')
    queryset = Aqms.nonzero_objects.values(month=ExtractMonth('date_time'), week=ExtractWeek('date_time'), year=ExtractYear(
        'date_time')).annotate(t_wat_pz=Avg('wat_pz'), t_wat_wt=Avg('wat_wt'), t_wat_all=Avg(F('wat_pz')+F('wat_wt'))).order_by('week')
    serializer_class = PowerWeeklySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class WindHourlyAveListView(generics.ListAPIView):
    queryset = Aqms.objects.values(hour=ExtractHour(
        'date_time'), day=ExtractDay('date_time'), month=ExtractMonth('date_time'), year=ExtractYear('date_time')).annotate(ave_wind=Avg('windspeed')).order_by('hour')
    serializer_class = WindHourlySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class WindDailyAveListView(generics.ListAPIView):
    queryset = Aqms.objects.values(
        week=ExtractWeek('date_time'), weekday=ExtractWeekDay('date_time')).annotate(ave_wind=Avg('windspeed')).order_by('weekday')
    serializer_class = WindDailySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class WindWeeklyAveListView(generics.ListAPIView):
    queryset = Aqms.objects.values(month=ExtractMonth(
        'date_time'), week=ExtractWeek('date_time'), year=ExtractYear('date_time')).annotate(ave_wind=Avg('windspeed')).order_by('week')
    serializer_class = WindWeeklySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class CoHourlyAveListView(generics.ListAPIView):
    queryset = Aqms.objects.values(hour=ExtractHour(
        'date_time'), day=ExtractDay('date_time'), month=ExtractMonth('date_time'), year=ExtractYear('date_time')).annotate(ave_co=Avg('ppm')).order_by('hour')
    serializer_class = CoHourlySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class CoDailyAveListView(generics.ListAPIView):
    queryset = Aqms.objects.values(
        week=ExtractWeek('date_time'), weekday=ExtractWeekDay('date_time')).annotate(ave_co=Avg('ppm')).order_by('weekday')
    serializer_class = CoDailySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class CoWeeklyAveListView(generics.ListAPIView):
    queryset = Aqms.objects.values(month=ExtractMonth(
        'date_time'), week=ExtractWeek('date_time'), year=ExtractYear('date_time')).annotate(ave_co=Avg('ppm')).order_by('week')
    serializer_class = CoWeeklySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DateFilter


class AqmsLatestView(APIView):
    def get(self, request, format=None):
        # queryset = Aqms.objects.latest('date_time')
        # queryset = Aqms.objects.values('date_time', 'ppm', 'windspeed').annotate(wat_all=(
        #     F('wat_pz')+F('wat_wt')), vol_all=(F('vol_pz')+F('vol_wt')), amp_all=(F('amp_pz')+F('amp_wt'))).order_by('-id')[0]

        queryset = Aqms.objects.all().annotate(
            date=TruncDate('date_time'), time=TruncTime('date_time')).order_by('-id')[0]

        serializer_class = AqmsLatestSerializer(queryset, many=False)
        return Response(serializer_class.data)

# class AqmsLatestView(generics.ListAPIView):
#     queryset = Aqms.objects.values('date_time', 'ppm', 'windspeed').annotate(wat_all=(
#         F('wat_pz')+F('wat_wt')), vol_all=(F('vol_pz')+F('vol_wt')), amp_all=(F('amp_pz')+F('amp_wt'))).order_by('-id')[0]

#     serializer_class = AqmsLatestSerializer

# class ColevelLatestView(APIView):
#     def get(self, request, format=None):
#         queryset = Colevel.objects.latest('date_time')
#         serializer_class = ColevelSerializer(queryset, many=False)
#         return Response(serializer_class.data)
