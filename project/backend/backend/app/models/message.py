from django.db import models
from .project import Project
import uuid


class Message(models.Model):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question : models.CharField = models.CharField(max_length=1024, help_text="問題")
    answer : models.CharField = models.CharField(max_length=1024, default="", editable=False, help_text="gpt答え")
    project : models.ForeignKey = models.ForeignKey(Project, on_delete=models.PROTECT, help_text="対話", related_name="message")

