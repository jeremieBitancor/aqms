from django.urls import path
from .views import ColevelListView
urlpatterns = [
    path('colevel/', ColevelListView.as_view(), name="colevel-all"),
]
