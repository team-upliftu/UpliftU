from django.db import models
import uuid

class Genre(models.Model):
    # id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name : models.CharField = models.CharField(primary_key=True, max_length=255, help_text="ジャンル名")
    label : models.CharField = models.CharField(max_length=255, help_text="ラベル")
    icon : models.URLField = models.URLField(help_text="アイコンURL", max_length=1023)
