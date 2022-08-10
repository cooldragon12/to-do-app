from django.urls import path
from .views import BoardCreateView, TaskViewset, BoardViewset, TaskCreateView

# Task Viewset Options
task_create = TaskCreateView.as_view()
task_update = TaskViewset.as_view({'put':'update'})
task_list = TaskViewset.as_view({'get':'list'})

# Board Viewset Options
list_create = BoardCreateView.as_view()
list_update = BoardViewset.as_view({'put':'update'})
list_all = BoardViewset.as_view({'get':'list'})

# Routings API ENDPOINTs
urlpatterns = [
    # Task endpoints
    # NOTE: POST-Create Viewset should also have auto add in a Board
    # as the Board required the Task to complete
    path('task/create/', task_create, name="create-new-task"),
    path('task/<int:pk>/', task_update, name="update-task"),
    path('task/', task_list, name="get_all_task"), # NOTE: Will remove later


    # Board endpoints
    path('list/create/', list_create, name="create-new-board"),
    path('list/<int:pk>', list_update, name="update-board"),
    path('list/', list_all, name="get-all-boards")
]