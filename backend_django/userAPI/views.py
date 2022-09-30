from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ToDoItem


class TodoView(APIView):
    def get(self, request, format=None):
        todoDict = {}
        toDoObjects = ToDoItem.objects.all()

        index = 0
        if request.method == "GET":
            try:
                for todo in toDoObjects:
                    todoDict[index] = {
                        'id': todo.id,
                        'name': todo.name,
                        'finished': todo.finished,
                    }
                    index += 1
                return Response(todoDict, status=200)
            except Exception as e:
                print(e)
                return Response(status=404)

        return Response(status=200)

    def post(self, request, format=None):
        # JSON Object: {"todo": [{"NAME": NAME}, {"FINISHED": FINISHED}]}
        todos = request.data['todo']

        bad_setting = []
        for todo in todos:
            try:
                new_todo = ToDoItem(name=todo["NAME"], finished=todo["FINISHED"])
                new_todo.save()
            except Exception as e:
                print(e)
                bad_setting.append(todo)

        if len(bad_setting) > 0:
            return Response({"INVALID SETTINGS": bad_setting}, status=200)

        todoDict = {}
        toDoObjects = ToDoItem.objects.all()

        index = 0
        for todo in toDoObjects:
            todoDict[index] = {
                'id': todo.id,
                'name': todo.name,
                'finished': todo.finished,
            }
            index += 1
        return Response(todoDict, status=200)

    def put(self, request, format=None):
        # JSON Object: {"todo": [{"ID": ID}, {"NAME": NAME}, {"FINISHED": NEW_VALUE}]
        todos = request.data['todo']

        for todo in todos:
            bad_setting = []
            try:
                update_todo = ToDoItem.objects.get(id=todo["ID"])
                update_todo.name = todo["NAME"]
                update_todo.finished = todo["FINISHED"]
                update_todo.save()

            except Exception as e:
                print(e)
                bad_setting.append(todo)
                return Response({"INVALID SETTINGS": e}, status=400)

        return Response(status=200)

    def delete(self, request, format=None):
        # JSON Object: {"todo": [{"NAME": NAME}]}
        print(request.data)
        todos = request.data['todo']

        for todo in todos:
            try:
                toDoObject = ToDoItem.objects.get(id=todo['ID'])
                toDoObject.delete()

            except Exception as e:
                print(e)
                return Response({"INVALID SETTING": e}, status=400)

        return Response(status=200)
