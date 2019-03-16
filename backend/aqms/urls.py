from django.urls import path
from aqms.views import AqmsListCreateView, PowerListView, WindspeedListView, AqmsLatestView, ColevelListView, PowerAveListView, PowerHourlyAveListView, PowerDailyAveListView, PowerWeeklyAveListView, WindHourlyAveListView, WindDailyAveListView, WindWeeklyAveListView, CoHourlyAveListView, CoDailyAveListView, CoWeeklyAveListView

urlpatterns = [
    path('aqms/', AqmsListCreateView.as_view(), name='aqms'),
    path('aqms/power/', PowerListView.as_view(), name='power'),
    path('aqms/windspeed/', WindspeedListView.as_view(), name='windspeed'),
    path('aqms/colevel/', ColevelListView.as_view(), name='colevel'),
    path('aqms/latest/', AqmsLatestView.as_view(), name='aqms-latest'),
    path('aqms/average/power', PowerAveListView.as_view(), name='power-ave'),
    path('aqms/power/hourly', PowerHourlyAveListView.as_view(), name='power-daily'),
    path('aqms/power/daily', PowerDailyAveListView.as_view(), name='power-weekly'),
    path('aqms/power/weekly', PowerWeeklyAveListView.as_view(), name='power-monthly'),
    path('aqms/windspeed/hourly',
         WindHourlyAveListView.as_view(), name='power-daily'),
    path('aqms/windspeed/daily', WindDailyAveListView.as_view(), name='power-weekly'),
    path('aqms/windspeed/weekly',
         WindWeeklyAveListView.as_view(), name='power-monthly'),
    path('aqms/colevel/hourly',
         CoHourlyAveListView.as_view(), name='power-daily'),
    path('aqms/colevel/daily', CoDailyAveListView.as_view(), name='power-weekly'),
    path('aqms/colevel/weekly',
         CoWeeklyAveListView.as_view(), name='power-monthly'),
    # path('aqms/latest/colevel', ColevelLatestView.as_view(), name='colevel-latest')

]
