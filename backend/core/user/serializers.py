from rest_framework import serializers

from core.file_upload.constants import AWS_BUCKET_URL
from core.models import User


class UserBasicDetailSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "full_name", "image"]

    def get_image(self, obj):
        if obj.image:
            return AWS_BUCKET_URL + "/" + obj.image
        return obj.image
