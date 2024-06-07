from rest_framework import serializers
from ..models import Participation

class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = ["id", "gathering", "participant", "created_at"]
