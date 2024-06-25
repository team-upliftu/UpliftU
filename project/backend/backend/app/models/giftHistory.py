from django.db import models
from .receiver import Receiver
import uuid


class GiftHistory(models.Model):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gift : models.CharField = models.CharField(max_length=1024, help_text="プレゼント")
    receiver : models.ForeignKey = models.ForeignKey(Receiver, on_delete=models.PROTECT, help_text="受け取り手", related_name="giftHistory")

