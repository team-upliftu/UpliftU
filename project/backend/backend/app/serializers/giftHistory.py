from rest_framework import serializers
from ..models import GiftHistory

class GiftHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftHistory
        fields = ["id", "gift", "receiver"]