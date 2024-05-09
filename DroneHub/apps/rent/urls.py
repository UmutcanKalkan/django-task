from django.urls import path
from .views import RentListCreateView, RentDetailView

urlpatterns = [
    path('', RentListCreateView.as_view()),
    path('<pk>', RentDetailView.as_view()),
]