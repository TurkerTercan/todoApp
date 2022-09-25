from django.db import models


# Create your models here.
class ToDoItem(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=512, blank=False, null=False, default="todo_name")
    finished = models.BooleanField(default=False)
