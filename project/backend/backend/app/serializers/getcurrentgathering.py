from rest_framework import serializers
from users.models import CustomUser
from ..models import Participation

class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = ["id", "gathering", "participant", "created_at"]


class GetCurrentGatheringSerializer(serializers.ModelSerializer):
    gathering = ParticipationSerializer(many=True, source='participations')
    gathering = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='gathering.id',
        source='participations'
    )
    class Meta:
        model = CustomUser
        fields = ['id','gathering']