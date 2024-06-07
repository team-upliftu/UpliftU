from ..models import Gathering
from ..serializers import GatheringSerializer, GatheringSerializerV2
from rest_framework import viewsets

class GatheringViewSet(viewsets.ModelViewSet):
    queryset = Gathering.objects.all()
    serializer_class = GatheringSerializer

class GatheringViewSetV2(viewsets.ModelViewSet):
    queryset = Gathering.objects.all()
    serializer_class = GatheringSerializerV2