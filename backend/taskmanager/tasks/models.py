from django.db import models


class Task(models.Model):
    name = models.CharField()
    description = models.CharField()
    is_done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
