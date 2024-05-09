from django.urls import path
from .views import DroneListCreateView, DroneDetailView

urlpatterns = [
    path('', DroneListCreateView.as_view()),
    path('<pk>', DroneDetailView.as_view()),
]