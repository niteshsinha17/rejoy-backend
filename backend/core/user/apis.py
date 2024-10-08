from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from common.apis import BaseApi
from core.user.serializers import UserBasicDetailSerializer


class UserBasicDetail(BaseApi):
    def get(self, request, *args, **kwargs):
        user = self.get_user()
        serializer = UserBasicDetailSerializer(user)
        return Response(
            data=serializer.data,
            status=HTTP_200_OK,
        )


# class UpdateUserDetailApi(BaseApi):

#     def put(self, request, *args, **kwargs):
#         user = self.get_user()
#         serializer = UpdateUserDetailSerializer(user, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(
#             data=serializer.data,
#             status=HTTP_200_OK,
#         )
