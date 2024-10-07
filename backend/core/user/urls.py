from django.urls import path

from core.user.apis import UserBasicDetail

urlpatterns = [
    path("basic-detail/", UserBasicDetail.as_view(), name="self-user-data"),
    # path("update/", UpdateUserDetailApi.as_view(), name="update-user-detail"),
]
