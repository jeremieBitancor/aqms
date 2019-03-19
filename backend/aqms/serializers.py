from rest_framework import serializers
from aqms.models import Aqms
from django.db.models.fields import FloatField, IntegerField, DecimalField


class PowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aqms
        fields = ('vol_pz', 'amp_pz', 'wat_pz',
                  'date_time', 'vol_wt', 'amp_wt', 'wat_wt')


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


class AqmsLatestSerializer(serializers.ModelSerializer):
    # wat_all = serializers.DecimalField(max_digits=6, decimal_places=3)
    # vol_all = serializers.DecimalField(max_digits=6, decimal_places=3)
    # amp_all = serializers.DecimalField(max_digits=6, decimal_places=3)

    class Meta:
        model = Aqms
        fields = ('date_time', 'ppm', 'windspeed',
                  'wat_pz', 'vol_pz', 'amp_pz', 'wat_wt', 'vol_wt', 'amp_wt')


class PowerAveSerializer(serializers.ModelSerializer):
    ave_wat_pz = serializers.DecimalField(max_digits=6, decimal_places=3)
    ave_wat_wt = serializers.DecimalField(max_digits=6, decimal_places=3)
    hour = serializers.IntegerField()
    # date = serializers.IntegerField()
    week = serializers.IntegerField()
    month = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wat_wt',
                  'ave_wat_pz', 'hour', 'week', 'month')


class PowerHourlySerializer(serializers.ModelSerializer):
    t_wat_pz = serializers.DecimalField(max_digits=8, decimal_places=3)
    t_wat_wt = serializers.DecimalField(max_digits=8, decimal_places=3)
    t_wat_all = serializers.DecimalField(max_digits=6, decimal_places=3)
    hour = serializers.IntegerField()
    day = serializers.IntegerField()
    month = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'hour', 't_wat_all', 't_wat_wt',
                  't_wat_pz', 'day', 'month', 'year')


class PowerDailySerializer(serializers.ModelSerializer):
    t_wat_pz = serializers.DecimalField(max_digits=8, decimal_places=3)
    t_wat_wt = serializers.DecimalField(max_digits=8, decimal_places=3)
    t_wat_all = serializers.DecimalField(max_digits=6, decimal_places=3)
    week = serializers.IntegerField()
    weekday = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 't_wat_all', 't_wat_wt', 't_wat_pz',
                  'week', 'weekday', )


class PowerWeeklySerializer(serializers.ModelSerializer):
    t_wat_pz = serializers.DecimalField(max_digits=8, decimal_places=3)
    t_wat_wt = serializers.DecimalField(max_digits=8, decimal_places=3)
    t_wat_all = serializers.DecimalField(max_digits=8, decimal_places=3)
    month = serializers.IntegerField()
    week = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 't_wat_all', 't_wat_wt',
                  't_wat_pz', 'week', 'month', 'year')


class WindHourlySerializer(serializers.ModelSerializer):
    ave_wind = serializers.DecimalField(max_digits=6, decimal_places=3)
    hour = serializers.IntegerField()
    day = serializers.IntegerField()
    month = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'hour', 'ave_wind', 'day', 'month', 'year')


class WindDailySerializer(serializers.ModelSerializer):
    ave_wind = serializers.DecimalField(max_digits=6, decimal_places=3)
    week = serializers.IntegerField()
    weekday = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wind', 'week', 'weekday')


class WindWeeklySerializer(serializers.ModelSerializer):
    ave_wind = serializers.DecimalField(max_digits=6, decimal_places=3)
    month = serializers.IntegerField()
    week = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_wind', 'week', 'month', 'year')


class CoHourlySerializer(serializers.ModelSerializer):
    ave_co = serializers.DecimalField(max_digits=5, decimal_places=3)
    hour = serializers.IntegerField()
    day = serializers.IntegerField()
    month = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'hour', 'ave_co', 'day', 'month', 'year')


class CoDailySerializer(serializers.ModelSerializer):
    ave_co = serializers.DecimalField(max_digits=6, decimal_places=3)
    week = serializers.IntegerField()
    weekday = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_co', 'week', 'weekday')


class CoWeeklySerializer(serializers.ModelSerializer):
    ave_co = serializers.DecimalField(max_digits=6, decimal_places=3)
    month = serializers.IntegerField()
    week = serializers.IntegerField()
    year = serializers.IntegerField()

    class Meta:
        model = Aqms
        fields = ('date_time', 'ave_co', 'week', 'month', 'year')
