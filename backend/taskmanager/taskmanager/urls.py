from django.contrib import admin
from django.urls import path, include
from tasks.views import TasksApiView
from rest_framework import routers

urlpatterns = [
    path('admin/', admin.site.urls),
]

router = routers.DefaultRouter()
router.register(r'tasks', TasksApiView)

urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns += router.urls