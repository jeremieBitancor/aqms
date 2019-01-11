from django.urls import path
from .views import ColevelListView, ColevelAveListView
urlpatterns = [
    path('colevel/', ColevelListView.as_view(), name="colevel-all"),
    path('colevel/average', ColevelAveListView.as_view(), name="colevel-ave")

]
