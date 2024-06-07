from ..models import Message, Gathering
from ..serializers import MessageSerializer, MessageLogsSerializer
from rest_framework import viewsets

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        gathering = self.request.query_params.get('gathering')

        params = {}

        if gathering:
            params['gathering'] = gathering

        queryset = Message.objects.filter(**params)

        return queryset
    
class MessageLogsViewSet(viewsets.ModelViewSet):
    queryset = Gathering.objects.all()
    serializer_class = MessageLogsSerializer
