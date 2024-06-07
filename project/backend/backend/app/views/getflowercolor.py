from ..models import Ownership
from users.models import CustomUser
from ..serializers import GetFlowerColorSerializer, GetFlowerColorSerializer_v2
from rest_framework import viewsets


class GetFlowerColorViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = GetFlowerColorSerializer

class GetFlowerColorViewSet_v2(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = GetFlowerColorSerializer_v2
