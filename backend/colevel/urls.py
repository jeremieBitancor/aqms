from django.urls import path
from .views import ColevelListView, AvePpm
urlpatterns = [
    path('colevel/', ColevelListView.as_view(), name="colevel-all"),
    # path('colevel/ave', AvePpm.as_view(), name="colevel-all"),

]
