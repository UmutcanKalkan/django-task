from django_filters import rest_framework as filters
from .models import Drone


class DroneFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    model = filters.CharFilter(lookup_expr='icontains')
    manufacturer = filters.CharFilter(lookup_expr='icontains')
    weight = filters.NumberFilter()
    wingspan = filters.NumberFilter()
    range = filters.NumberFilter()
    speed = filters.NumberFilter()
    camera_resolution = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Drone
        fields = [
            'name',
            'model',
            'manufacturer',
            'weight',
            'wingspan',
            'range',
            'speed',
            'camera_resolution',
        ]
