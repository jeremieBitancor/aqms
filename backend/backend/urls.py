from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers

# router = routers.SimpleRouter()
# router.register(r'colevel')


urlpatterns = [
    path('admin/', admin.site.urls),

    re_path('api/', include('aqms.urls'))
]

# urlpatterns += patterns('',
#                         url(r'^api/', include(patterns('',
#                                                        url(r'^colevel/',
#                                                            include('colevel.urls')),
#                                                        url(r'^power/',
#                                                            include('power.urls')),
#                                                        )))
#                         )
