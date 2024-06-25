from django.db import models
import uuid

class Receiver(models.Model):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    age = models.PositiveIntegerField(help_text="年齢")
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], help_text="性別")
    relationship = models.CharField(max_length=255, help_text="関係")
    receiver_name = models.CharField(max_length=255, help_text="名前")
    hobbies = models.CharField(max_length=255, help_text="趣味")