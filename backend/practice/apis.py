from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED

from common.apis import BaseApi, OptionalAuthApi
from practice.serializers import (
    AttemptedQuestionsSerializer,
    QuestionAttemptInputSerializer,
    QuestionAttemptSerializer,
)
from practice.services import AttemptService, PracticePlanService, ProgressService


class SubmitAttemptApi(BaseApi):
    """POST api/v1/practice/attempt/ - Record a question attempt (no answer storage)"""

    input_serializer_class = QuestionAttemptInputSerializer

    def post(self, request, *args, **kwargs):
        validated_data = self.validate_input_data()
        user = self.get_user()

        attempt = AttemptService.record_attempt(
            user=user,
            course=validated_data["course"],
            subject=validated_data["subject"],
            module=validated_data["module"],
            question_id=validated_data["question_id"],
        )

        serializer = QuestionAttemptSerializer(attempt)
        return Response(
            data=serializer.data,
            status=(
                HTTP_201_CREATED
                if attempt.created_at == attempt.updated_at
                else HTTP_200_OK
            ),
        )


class AttemptedQuestionsApi(BaseApi):
    """GET practice/attempted/?course=&subject= — all modules; add &module= for one module."""

    def get(self, request, *args, **kwargs):
        user = self.get_user()
        course = request.query_params.get("course")
        subject = request.query_params.get("subject")
        module = request.query_params.get("module")

        if not all([course, subject]):
            return Response(
                data={"message": "Missing required parameters: course, subject"},
                status=400,
            )

        if module:
            data = ProgressService.get_attempted_question_ids(
                user=user,
                course=course,
                subject=subject,
                module=module,
            )
            serializer = AttemptedQuestionsSerializer(data)
            return Response(
                data=serializer.data,
                status=HTTP_200_OK,
            )

        by_module = ProgressService.get_attempted_by_subject(
            user=user, course=course, subject=subject
        )
        return Response(data={"by_module": by_module}, status=HTTP_200_OK)


class CurrentPracticePlanApi(OptionalAuthApi):
    """
    GET api/v1/practice/plan/ — the user's ``is_active=True`` line item if not expired; else free tier.

    ``history`` lists inactive plan rows and an expired-but-still-active line item when applicable.
    """

    def get(self, request, *args, **kwargs):
        payload = PracticePlanService.get_active_plan_state(request.user)
        return Response(data=payload, status=HTTP_200_OK)
