from django.urls import path

from core.apis.timezone import TimeZoneListAPI
from core.file_upload.apis import GetPresignedUrl

urlpatterns = [
    path("timezone/list", TimeZoneListAPI.as_view(), name="timezones"),
    path(
        "create-presigned-url/",
        GetPresignedUrl.as_view(),
        name="get-presigned-url",
    ),
]
