from django.db import models


class Task(models.Model):
    name = models.CharField()
    description = models.CharField()
    is_done = models.BooleanField(default=False)
