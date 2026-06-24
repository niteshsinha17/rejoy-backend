import urllib
import uuid

import boto3
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from core.apis import BaseApi
from core.constants import (
    AWS_ACCESS_KEY_ID,
    AWS_BUCKET_URL,
    AWS_SECRET_ACCESS_KEY,
    AWS_STORAGE_BUCKET_NAME,
)


EXPIRATION = 3600


class GetPresignedUrlInputSerializer(serializers.Serializer):
    file_name = serializers.CharField(required=True)
    file_path = serializers.CharField(required=True)
    file_type = serializers.CharField(required=True)


class GetPresignedUrl(BaseApi):
    input_serializer_class = GetPresignedUrlInputSerializer

    def post(self, request, *args, **kwargs):
        data = self.validate_input_data()
        s3Client = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name="us-west-2",
        )
        file_extension = data["file_name"].split(".")[-1]
        fileKey = (
            data["file_path"] + "/" + uuid.uuid4().hex + "." + file_extension
        )  # noqa
        try:
            presigned_url = s3Client.generate_presigned_url(
                "put_object",
                Params={
                    "Bucket": AWS_STORAGE_BUCKET_NAME,
                    "Key": fileKey,
                    "ContentType": data["file_type"],
                    "ACL": "public-read",
                },
            )
        except Exception as e:
            return Response(
                status=HTTP_400_BAD_REQUEST,
            )
        return Response(
            data={
                "presigned_url": presigned_url,
                "file_key": fileKey,
                "base_url": AWS_BUCKET_URL,
                "direct_url": urllib.request.pathname2url(fileKey),
            },
            status=HTTP_200_OK,
        )
