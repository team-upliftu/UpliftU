from ..models import Participation
from ..serializers import ParticipationSerializer
from rest_framework import viewsets

class ParticipationViewSet(viewsets.ModelViewSet):
    queryset = Participation.objects.all()
    serializer_class = ParticipationSerializer

    def get_queryset(self):
        gathering = self.request.query_params.get('gathering')
        participant= self.request.query_params.get('participant')

        params = {}

        if gathering :
            params['gathering'] = gathering
        if participant:
            params['participant'] = participant


        queryset = Participation.objects.filter(**params)

        return queryset

 