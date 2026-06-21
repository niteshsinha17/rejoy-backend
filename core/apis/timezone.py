import pytz
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from core.apis.base import BaseApi


class TimeZoneListAPI(BaseApi):
    def get(self, request, *args, **kwargs):
        timezones = pytz.all_timezones
        return Response(data=timezones, status=HTTP_200_OK)
