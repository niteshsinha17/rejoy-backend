from rest_framework import serializers

from core.file_upload.constants import AWS_BUCKET_URL
from core.models import DoctorProfile, User


class UserBasicDetailSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "image",
            "username",
        ]

    def get_image(self, obj):
        if obj.image:
            return AWS_BUCKET_URL + "/" + obj.image
        return obj.image


class BasicDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "full_name",
            "image",
            "phone_number",
            "overview",
            "address",
        ]

    def get_image(self, obj):
        if obj.image:
            return AWS_BUCKET_URL + "/" + obj.image
        return obj.image


class DoctorProfileSerializer(serializers.ModelSerializer):

    basic_detail = BasicDetailsSerializer(source="user")

    class Meta:
        model = DoctorProfile
        fields = [
            "basic_detail",
            "specialties",
            "conditions_treated",
            "procedures_performed",
            "insurance_accepted",
        ]

    def update(self, instance, validated_data):
        basic_details_data = validated_data.pop("user", None)

        if basic_details_data:
            user = instance.user
            for attr, value in basic_details_data.items():
                setattr(user, attr, value)
            user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
