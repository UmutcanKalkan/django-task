from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .filters import DroneFilter
from .serializers import DroneSerializer
from .models import Drone


class DroneListCreateView(generics.ListCreateAPIView):
    queryset = Drone.objects.all()
    serializer_class = DroneSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DroneFilter


class DroneDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drone.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = DroneSerializer
