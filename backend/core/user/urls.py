from django.urls import path

from core.user.apis import (
    DoctorProfileApi,
    DoctorPublicProfile,
    UpdateDoctorProfileApi,
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
]
