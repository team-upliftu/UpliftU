from rest_framework import serializers
from ..models import Message, Gathering
from .user import CustomUserSerializer

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "gathering", "body", "sender", "created_at"]

class MessageDetailSerializer(serializers.ModelSerializer):
    sender = CustomUserSerializer()
    class Meta:
        model = Message
        fields = ["id", "gathering", "body", "sender", "created_at"]

class MessageLogsSerializer(serializers.ModelSerializer):
    messages = MessageDetailSerializer(many=True)
    
    class Meta:
        model = Gathering
        fields = ["id", "messages"]