from django.db import models
from users.models import CustomUser 
from .genre import Genre
from django.utils.translation import gettext_lazy as _

import uuid

class Gathering(models.Model):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pos_lat : models.FloatField =  models.FloatField(help_text="募集場所_緯度")
    pos_lng : models.FloatField =  models.FloatField(help_text="募集場所_経度")
    host : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, help_text="募集者")
    genre : models.ForeignKey = models.ForeignKey(Genre, on_delete=models.PROTECT, help_text="ジャンル")
    body : models.CharField = models.CharField(max_length=1024, help_text="本文", null=True, blank=True, default="")
    num_participant : models.IntegerField = models.IntegerField(help_text="人数")
    created_at : models.DateTimeField = models.DateTimeField(auto_now_add=True, help_text="募集開始日時")
    start_time : models.DateTimeField = models.DateTimeField(help_text="集合時刻")

    class Budget(models.TextChoices):
        FREE = 'FREE', _('無料')
        UNDER_1000 = 'UNDER_1000', _('~ 1,000円')
        UNDER_3000 = 'UNDER_3000', _('1,000円 ~ 3,000円')
        UNDER_5000 = 'UNDER_5000', _('3,000円 ~ 5,000円')
        OVER_5000 = 'OVER_5000', _('5,000円 ~')
        UNDECIDED = 'UNDECIDED', _('未定')
    
    budget : models.CharField = models.CharField(max_length=10, choices=Budget.choices, default=Budget.UNDECIDED, help_text="予算")
    title : models.CharField = models.CharField(max_length=255, help_text="タイトル", default="(タイトル未設定)")
    

 