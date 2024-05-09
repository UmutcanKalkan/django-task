from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Rent


class RentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Rent
        fields = ['id', 'drone', 'user', 'start_date', 'end_date', 'rental_fee']
