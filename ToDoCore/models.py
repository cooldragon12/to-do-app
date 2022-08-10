from django.db import models

# Create your models here.
class Task(models.Model):
    """Task Model
    
    #Columns:
    
    - content
    - status

    #Attributes:
    - index

    """
    # ToDo:
    # * Create due datestime attributes for the model
    # * Subtasking if possible.
    content = models.CharField(max_length=150, null=False)
    status = models.BooleanField()
    # parentTask = models.ForeignKey()
    # subtask = models.ManyToManyField('self', related_name='subtasking', null=True)
    # Attributes
    # subtask_restrict = models.BooleanField(default=False)
    index = models.IntegerField()
    
        
# class SubTask(Task):
#     """Inherit Task Model"""
#     subtask = None
#     subtask_restrict = models.BooleanField(default=False)
    
class Board(models.Model):
    """Board Model
    columns:
    *tasks - ManytoManyFields
    *description - Text
    *date_created - DateTime
    """
    tasks = models.ManyToManyField(Task, related_name="tasks_board")
    title = models.CharField(max_length=50, null=True)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    
    