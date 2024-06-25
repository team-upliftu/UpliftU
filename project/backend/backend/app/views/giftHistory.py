from ..models import GiftHistory
from ..serializers import GiftHistorySerializer
from rest_framework import viewsets

class GiftHistoryViewSet(viewsets.ModelViewSet):
    queryset = GiftHistory.objects.all()
    serializer_class = GiftHistorySerializer