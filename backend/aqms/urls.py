from django.urls import path
from aqms.views import AqmsListCreateView, PowerListView, WindspeedListView, ColevelListView, AqmsLatestView

urlpatterns = [
    path('aqms/', AqmsListCreateView.as_view(), name='aqms'),
    path('aqms/power/', PowerListView.as_view(), name='power'),
    path('aqms/windspeed/', WindspeedListView.as_view(), name='windspeed'),
    path('aqms/colevel/', ColevelListView.as_view(), name='colevel'),
    path('aqms/latest/', AqmsLatestView.as_view(), name='aqms-latest'),
]
