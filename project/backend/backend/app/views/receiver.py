from ..models import Receiver
from ..serializers import ReceiverSerializer
from rest_framework import viewsets

class ReceiverViewSet(viewsets.ModelViewSet):
    queryset = Receiver.objects.all()
    serializer_class = ReceiverSerializer