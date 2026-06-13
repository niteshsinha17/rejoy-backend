from rest_framework import serializers

from practice.models import QuestionAttempt


class QuestionAttemptInputSerializer(serializers.Serializer):
    """Validate input for submitting a question attempt"""

    course = serializers.CharField(max_length=50)
    subject = serializers.CharField(max_length=100)
    module = serializers.CharField(max_length=100)
    question_id = serializers.CharField(max_length=100)


class QuestionAttemptSerializer(serializers.ModelSerializer):
    """Full response serializer for QuestionAttempt"""

    class Meta:
        model = QuestionAttempt
        fields = [
            "id",
            "user",
            "course",
            "subject",
            "module",
            "question_id",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at"]


class AttemptedQuestionsSerializer(serializers.Serializer):
    """List of attempted question IDs - just IDs, no answer data"""

    question_ids = serializers.ListField(child=serializers.CharField())
