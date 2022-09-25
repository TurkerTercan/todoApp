from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1.0/user/', include('userAPI.urls'))
]


# localhost:8000
# localhost:8000/admin
# localhost:8000/api/v1.0/user/

