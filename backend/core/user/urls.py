from django.urls import path

from core.user.apis import (
    AskApi,
    DoctorProfileApi,
    DoctorPublicProfile,
    GenerateAgentResponseApi,
    UpdateDoctorProfileApi,
    UpdateNpiNumberApi,
    UserBasicDetailApi,
)

urlpatterns = [
    path("basic-detail/", UserBasicDetailApi.as_view(), name="self-user-data"),
    path("doctor-profile/", DoctorProfileApi.as_view(), name="doctor-profile"),
    path(
        "doctor-profile/update/",
        UpdateDoctorProfileApi.as_view(),
        name="update-doctor-profile",
    ),
    path(
        "<str:username>/doctor-profile/",
        DoctorPublicProfile.as_view(),
        name="doctor-public-profile",
    ),
    path(
        "<str:username>/generate-response/",
        GenerateAgentResponseApi.as_view(),
        name="generate-agent-response",
    ),
    path("ask/", AskApi.as_view(), name="ask"),
    path("doctor-profile/update-npi/", UpdateNpiNumberApi.as_view(), name="update-npi"),
]
