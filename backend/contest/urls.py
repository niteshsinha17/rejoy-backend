from django.urls import path

from contest.apis import (
    ContestAnswerApi,
    ContestDetailApi,
    ContestLeaderboardApi,
    ContestListApi,
    ContestPracticeApi,
    ContestResultApi,
    ContestStartApi,
    ContestSubmitApi,
)

urlpatterns = [
    path("", ContestListApi.as_view(), name="contest_list"),
    path("<slug:slug>/", ContestDetailApi.as_view(), name="contest_detail"),
    path("<slug:slug>/practice/", ContestPracticeApi.as_view(), name="contest_practice"),
    path("<slug:slug>/start/", ContestStartApi.as_view(), name="contest_start"),
    path("<slug:slug>/answer/", ContestAnswerApi.as_view(), name="contest_answer"),
    path("<slug:slug>/submit/", ContestSubmitApi.as_view(), name="contest_submit"),
    path("<slug:slug>/result/", ContestResultApi.as_view(), name="contest_result"),
    path(
        "<slug:slug>/leaderboard/",
        ContestLeaderboardApi.as_view(),
        name="contest_leaderboard",
    ),
]
