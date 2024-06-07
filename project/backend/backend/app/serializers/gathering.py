from rest_framework import serializers
from ..models import Gathering, Participation
from users.models import CustomUser

class GatheringSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gathering
        fields = ["id", "pos_lat", "pos_lng", "host", "genre", "body", "num_participant", "created_at", "start_time", "budget", "title"]
        
class ParticipantUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "user_name", "color", "email"]

class ParticipantListSerializer(serializers.ModelSerializer):
    participant = ParticipantUserSerializer()

    class Meta:
        model = Participation
        fields = ["id", "participant", "created_at"]

class GatheringSerializerV2(serializers.ModelSerializer):
    participants = ParticipantListSerializer(many=True, source="participations")

    class Meta:
        model = Gathering
        fields = ["id", "pos_lat", "pos_lng", "host", "genre", "body", "num_participant", "created_at", "start_time", "budget", "title", "participants"]
        