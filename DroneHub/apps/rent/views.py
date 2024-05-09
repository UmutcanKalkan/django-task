from django_filters import rest_framework as filters
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .serializers import RentSerializer
from .models import Rent
from .filters import RentFilter


class RentListCreateView(generics.ListCreateAPIView):
    serializer_class = RentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RentFilter

    def get_queryset(self):
        """
        This view should return a list of all the rents
        for the currently authenticated user or all rents if the user is a superuser.
        """
        user = self.request.user
        if user.is_superuser:
            return Rent.objects.all()
        return Rent.objects.filter(user=user)

    def perform_create(self, serializer):
        # Assign the user who is creating the rent
        serializer.save(user=self.request.user)


class RentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RentSerializer

    def get_queryset(self):
        """
        This view returns a rent object based on the user's status.
        Superusers can view any rent, while regular users can only view their own rents.
        """
        user = self.request.user
        if user.is_superuser:
            return Rent.objects.all()
        return Rent.objects.filter(user=user)

    def get_object(self):
        """
        Returns the object the view is displaying.
        You may want to override this if you need to provide non-standard queryset filtering,
        or if your object is not fetched by a primary key.
        """
        obj = super().get_object()
        if obj.user != self.request.user and not self.request.user.is_superuser:
            raise PermissionDenied("You do not have permission to access this rent.")
        return obj
