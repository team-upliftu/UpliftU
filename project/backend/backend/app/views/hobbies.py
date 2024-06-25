from ..models import Hobbies
from ..serializers import HobbiesSerializer
from rest_framework import viewsets

class HobbiesViewSet(viewsets.ModelViewSet):
    queryset = Hobbies.objects.all()
    serializer_class = HobbiesSerializer