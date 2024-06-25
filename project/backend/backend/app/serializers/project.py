from rest_framework import serializers
from ..models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "question_amount", "genre", "giftPurchaseDate", "giftGivingDate", "receiver"]