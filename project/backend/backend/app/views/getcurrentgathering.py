from users.models import CustomUser
from ..serializers.getcurrentgathering import GetCurrentGatheringSerializer
from rest_framework import viewsets

class GetCurrentGatheringViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = GetCurrentGatheringSerializer
