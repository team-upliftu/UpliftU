from django.db import models
from users.models import CustomUser 

import uuid

class Ownership(models.Model):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, help_text="所有者", related_name="presenters")
    presenter : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, help_text="贈呈者", related_name="owners")
    count : models.IntegerField = models.IntegerField(help_text="本数", default=1)
    