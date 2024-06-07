from rest_framework import serializers
from ..models import Ownership

class OwnershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ownership
        fields = ["id", "owner", "presenter", "count"]