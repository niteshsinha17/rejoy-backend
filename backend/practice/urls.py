from django.urls import path

from practice.apis import AttemptedQuestionsApi, SubmitAttemptApi

urlpatterns = [
    path("attempt/", SubmitAttemptApi.as_view(), name="submit_attempt"),
    path("attempted/", AttemptedQuestionsApi.as_view(), name="attempted_questions"),
]
