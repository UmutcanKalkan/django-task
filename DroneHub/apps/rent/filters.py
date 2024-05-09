from django_filters import rest_framework as filters
from .models import Rent


class RentFilter(filters.FilterSet):
    drone__name = filters.CharFilter(lookup_expr='icontains')
    user__username = filters.CharFilter(lookup_expr='icontains')
    start_date = filters.DateFilter()
    start_date__gt = filters.DateFilter(field_name='start_date', lookup_expr='gt')
    start_date__lt = filters.DateFilter(field_name='start_date', lookup_expr='lt')
    end_date = filters.DateFilter()
    end_date__gt = filters.DateFilter(field_name='end_date', lookup_expr='gt')
    end_date__lt = filters.DateFilter(field_name='end_date', lookup_expr='lt')
    rental_fee = filters.NumberFilter()
    rental_fee__gt = filters.NumberFilter(field_name='rental_fee', lookup_expr='gt')
    rental_fee__lt = filters.NumberFilter(field_name='rental_fee', lookup_expr='lt')

    class Meta:
        model = Rent
        fields = ['drone__name', 'user__username', 'start_date', 'start_date__gt', 'start_date__lt', 'end_date',
                  'end_date__gt', 'end_date__lt', 'rental_fee', 'rental_fee__gt', 'rental_fee__lt']
