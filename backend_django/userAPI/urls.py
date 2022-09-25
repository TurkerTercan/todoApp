from django.contrib import admin
from django.urls import path

from .views import TodoView
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token

urlpatterns = [
    path('todo-items', TodoView.as_view()),
    path('create-todo-item/', TodoView().as_view()),
    path('delete-todo-item/', TodoView().as_view()),
    path('update-todo-item/', TodoView().as_view()),

]
