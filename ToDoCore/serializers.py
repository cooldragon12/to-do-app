from rest_framework import serializers
from ToDoCore.models import Board, Task


# class SubTaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SubTask
#         fields = ['__all__']

class TaskCreateSerializer(serializers.Serializer):
    content = serializers.CharField()
    status = serializers.BooleanField()
    index = serializers.IntegerField()
    # Determines which List it was added
    listId = serializers.IntegerField(write_only=True)
    
    def create(self, validated_data):
        board = Board.objects.get(id=validated_data['listId'])
        instance = Task(
            content = validated_data['content'], 
            status = validated_data['status'], 
            index = validated_data['index']
        )
        instance.save()
        board.tasks.add(instance)
        return instance

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('content','status','index')
   
class BoardCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = 'title','description'

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'