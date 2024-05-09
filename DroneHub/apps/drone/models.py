from django.db import models


class Drone(models.Model):
    """
    A drone model with its characteristics
    """
    name = models.CharField(max_length=50, unique=True)
    model = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=50)
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # in kg
    wingspan = models.DecimalField(max_digits=5, decimal_places=2)  # in meters
    range = models.DecimalField(max_digits=5, decimal_places=2)  # in kilometers
    speed = models.DecimalField(max_digits=5, decimal_places=2)  # in km/h
    camera_resolution = models.CharField(max_length=20)  # e.g., 4K, 1080p, etc.
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
