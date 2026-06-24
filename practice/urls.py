from django.urls import path

from practice.apis import AttemptedQuestionsApi, CurrentPracticePlanApi, SubmitAttemptApi

urlpatterns = [
    path("attempt/", SubmitAttemptApi.as_view(), name="submit_attempt"),
    path("attempted/", AttemptedQuestionsApi.as_view(), name="attempted_questions"),
    path("plan/", CurrentPracticePlanApi.as_view(), name="current_practice_plan"),
]
