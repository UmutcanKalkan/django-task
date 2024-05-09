from django.conf import settings
from django.db import models

from apps.drone.models import Drone


class Rent(models.Model):
    """
    A rent model for renting a drone
    """
    drone = models.ForeignKey(Drone, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    rental_fee = models.DecimalField(max_digits=10, decimal_places=2)  # in local currency
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Rent of {self.drone.name} by {self.user.username}"
