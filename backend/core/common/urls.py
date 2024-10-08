from django.urls import path

from core.common.apis import TimeZoneListAPI

urlpatterns = [
    path("timezone/list", TimeZoneListAPI.as_view(), name="timezones"),
]
