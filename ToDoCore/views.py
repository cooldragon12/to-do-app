from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import UpdateModelMixin, ListModelMixin

from .models import Board, Task
from .serializers import TaskCreateSerializer, TaskSerializer, BoardSerializer,BoardCreateSerializer
# Create your views here.

class TaskCreateView(CreateAPIView):
    serializer_class = TaskCreateSerializer
    
class TaskViewset(UpdateModelMixin,ListModelMixin, GenericViewSet):
    serializer_class = TaskSerializer
    model = Task
    queryset = model.objects.all()

class BoardCreateView(CreateAPIView):
    serializer_class = BoardCreateSerializer

class BoardViewset(UpdateModelMixin,ListModelMixin, GenericViewSet):
    serializer_class = BoardSerializer
    model = Board
    queryset = model.objects.all()