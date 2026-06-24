from django.urls import path

from rejoy_ai.apis import (
    InitializeThreadApi,
    ThreadGenerateResponseApi,
    ThreadListApi,
    ThreadMessageApi,
)

urlpatterns = [
    path("initialize-thread/", InitializeThreadApi.as_view(), name="initialize-thread"),
    path("thread/list/", ThreadListApi.as_view(), name="thread-list"),
    path(
        "thread/<slug:thread_slug>/messages/",
        ThreadMessageApi.as_view(),
        name="thread-message",
    ),
    path(
        "thread/<slug:thread_slug>/messages/add",
        ThreadGenerateResponseApi.as_view(),
        name="add-thread-message",
    ),
]
