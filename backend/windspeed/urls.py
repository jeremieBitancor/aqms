from django.urls import path
from .views import WindspeedListView, WindspeedAveListView, LatestWindspeedView

urlpatterns = [
    path('windspeed/', WindspeedListView.as_view(), name='windspeed-all'),
    path('windspeed/average/', WindspeedAveListView.as_view(), name='windspeed-ave'),
    path('windspeed/latest/', LatestWindspeedView.as_view(), name='windspeed-latest')
]
