from django.urls import path
from .views import PowerListView

urlpatterns = [
    path('power/', PowerListView.as_view(), name="power-all")
]
