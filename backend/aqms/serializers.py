from rest_framework import serializers
from aqms.models import Aqms
from django.db.models.fields import FloatField, IntegerField


class PowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = ('watts', 'ampere', 'voltage',
                  'date_time')


class WindspeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = ('date_time', 'windspeed')


class ColevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = ('ppm', 'date_time')


class AqmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = '__all__'


class PowerAveSerializer(serializers.ModelSerializer):
    ave_wat_pz = serializers.FloatField()
    ave_wat_wt = serializers.FloatField()
    hour = serializers.IntegerField()
    # date = serializers.IntegerField()
    week = serializers.IntegerField()
    month = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wat_wt',
                  'ave_wat_pz', 'hour', 'week', 'month')


class PowerHourlySerializer(serializers.ModelSerializer):
    ave_wat_pz = serializers.FloatField()
    ave_wat_wt = serializers.FloatField()
    ave_wat_all = serializers.FloatField()
    hour = serializers.IntegerField()
    day = serializers.IntegerField()
    month = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'hour', 'ave_wat_wt', 'ave_wat_all',
                  'ave_wat_pz', 'day', 'month', 'year')


class PowerDailySerializer(serializers.ModelSerializer):
    ave_wat_pz = serializers.FloatField()
    ave_wat_wt = serializers.FloatField()
    ave_wat_all = serializers.FloatField()
    week = serializers.IntegerField()
    weekday = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wat_wt', 'ave_wat_pz',
                  'week', 'weekday', 'ave_wat_all')


class PowerWeeklySerializer(serializers.ModelSerializer):
    ave_wat_pz = serializers.FloatField()
    ave_wat_wt = serializers.FloatField()
    ave_wat_all = serializers.FloatField()
    month = serializers.IntegerField()
    week = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wat_wt', 'ave_wat_all',
                  'ave_wat_pz', 'week', 'month', 'year')


class WindHourlySerializer(serializers.ModelSerializer):
    ave_wind = serializers.FloatField()
    hour = serializers.IntegerField()
    day = serializers.IntegerField()
    month = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'hour', 'ave_wind', 'day', 'month', 'year')


class WindDailySerializer(serializers.ModelSerializer):
    ave_wind = serializers.FloatField()
    week = serializers.IntegerField()
    weekday = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wind', 'week', 'weekday')


class WindWeeklySerializer(serializers.ModelSerializer):
    ave_wind = serializers.FloatField()
    month = serializers.IntegerField()
    week = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wind', 'week', 'month', 'year')


class CoHourlySerializer(serializers.ModelSerializer):
    ave_co = serializers.FloatField()
    hour = serializers.IntegerField()
    day = serializers.IntegerField()
    month = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'hour', 'ave_co', 'day', 'month', 'year')


class CoDailySerializer(serializers.ModelSerializer):
    ave_co = serializers.FloatField()
    week = serializers.IntegerField()
    weekday = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_co', 'week', 'weekday')


class CoWeeklySerializer(serializers.ModelSerializer):
    ave_co = serializers.FloatField()
    month = serializers.IntegerField()
    week = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_co', 'week', 'month', 'year')
