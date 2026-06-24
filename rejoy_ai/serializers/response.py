from rest_framework.serializers import ModelSerializer

from rejoy_ai.models import Thread, ThreadMessage


class ThreadMessageSerializer(ModelSerializer):

    class Meta:
        model = ThreadMessage
        fields = ["id", "input", "query", "sources", "text"]


class ThreadListSerializer(ModelSerializer):

    class Meta:
        model = Thread
        fields = ["id", "slug", "query", "created_at", "description"]
