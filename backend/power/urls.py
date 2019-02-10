from django.urls import path
from .views import PowerListView, PowerAveListView

urlpatterns = [
    path('power/', PowerListView.as_view(), name="power-all"),
    path('power/average', PowerAveListView.as_view(), name="power-ave")
]
