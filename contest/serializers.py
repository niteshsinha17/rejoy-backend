from rest_framework import serializers

from contest.models import Contest


class ContestListQuerySerializer(serializers.Serializer):
    LIST_TYPE_UPCOMING_OR_LIVE = "upcoming_or_live"
    LIST_TYPE_PAST = "past"

    type = serializers.ChoiceField(
        choices=[LIST_TYPE_UPCOMING_OR_LIVE, LIST_TYPE_PAST]
    )
    return_all = serializers.BooleanField(default=False, required=False)
    page = serializers.IntegerField(min_value=1, default=1, required=False)
    page_size = serializers.IntegerField(min_value=1, max_value=50, default=10, required=False)


class ContestListSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    end_time = serializers.SerializerMethodField()
    participated = serializers.SerializerMethodField()
    marking_scheme_display = serializers.CharField(
        source="get_marking_scheme_display", read_only=True
    )

    class Meta:
        model = Contest
        fields = [
            "slug",
            "title",
            "description",
            "course",
            "start_time",
            "end_time",
            "duration_minutes",
            "total_questions",
            "marking_scheme",
            "marking_scheme_display",
            "status",
            "participated",
        ]

    def get_status(self, obj: Contest) -> str:
        return obj.status

    def get_end_time(self, obj: Contest) -> str:
        return obj.end_time.isoformat()

    def get_participated(self, obj: Contest) -> bool:
        ids = self.context.get("participated_contest_ids")
        if not ids:
            return False
        return obj.pk in ids


class ContestDetailSerializer(ContestListSerializer):
    has_started = serializers.SerializerMethodField()
    is_submitted = serializers.SerializerMethodField()
    reminder_registered = serializers.SerializerMethodField()

    class Meta(ContestListSerializer.Meta):
        fields = ContestListSerializer.Meta.fields + [
            "has_started",
            "is_submitted",
            "reminder_registered",
        ]

    def _user_state(self) -> dict:
        return self.context.get("user_state", {})

    def get_has_started(self, obj) -> bool:
        return self._user_state().get("has_started", False)

    def get_is_submitted(self, obj) -> bool:
        return self._user_state().get("is_submitted", False)

    def get_reminder_registered(self, obj) -> bool:
        return bool(self._user_state().get("reminder_registered", False))

    def get_participated(self, obj: Contest) -> bool:
        if "user_state" in self.context:
            return bool(self._user_state().get("has_started", False))
        return super().get_participated(obj)


class AnswerInputSerializer(serializers.Serializer):
    question_id = serializers.CharField(max_length=100)
    selected_options = serializers.ListField(
        child=serializers.IntegerField(min_value=1, max_value=4),
        required=False,
        allow_empty=True,
    )
    is_skipped = serializers.BooleanField(default=False)

    def validate(self, attrs):
        skipped = attrs.get("is_skipped", False)
        opts = attrs.get("selected_options")
        if opts is None:
            opts = []
        if skipped:
            attrs["selected_options"] = []
            return attrs
        if len(opts) == 0:
            raise serializers.ValidationError(
                {
                    "selected_options": "Provide at least one option or set is_skipped to true.",
                }
            )
        attrs["selected_options"] = sorted({int(x) for x in opts})
        return attrs


class ContestQuestionSerializer(serializers.Serializer):
    """A single contest question (cop/exp only when contest has ended — service layer)."""

    id = serializers.CharField()
    question = serializers.CharField()
    opa = serializers.CharField()
    opb = serializers.CharField()
    opc = serializers.CharField()
    opd = serializers.CharField()
    choice_type = serializers.CharField(required=False)
    subject_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    topic_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    exp = serializers.CharField(required=False, allow_blank=True)
    cop = serializers.JSONField(required=False, allow_null=True)


class AnsweredQuestionSerializer(serializers.Serializer):
    question_id = serializers.CharField()
    selected_options = serializers.ListField(
        child=serializers.IntegerField(),
        required=False,
        allow_null=True,
    )
    is_skipped = serializers.BooleanField()


class ContestStartResponseSerializer(serializers.Serializer):
    questions = ContestQuestionSerializer(many=True)
    answered_questions = AnsweredQuestionSerializer(many=True)
    is_submitted = serializers.BooleanField()


class ContestPracticeResponseSerializer(serializers.Serializer):
    """Virtual practice: questions only, no server-side attempt."""

    slug = serializers.CharField()
    title = serializers.CharField()
    course = serializers.CharField()
    duration_minutes = serializers.IntegerField()
    total_questions = serializers.IntegerField()
    questions = serializers.JSONField()


class ContestAnswerResponseSerializer(serializers.Serializer):
    saved = serializers.BooleanField()


class ContestResultSerializer(serializers.Serializer):
    score = serializers.FloatField(allow_null=True)
    correct_answers = serializers.IntegerField(allow_null=True)
    rank = serializers.IntegerField(allow_null=True)
    total_participants = serializers.IntegerField()
    submitted_at = serializers.DateTimeField(allow_null=True)


class LeaderboardQuerySerializer(serializers.Serializer):
    page = serializers.IntegerField(min_value=1, default=1, required=False)
    page_size = serializers.IntegerField(min_value=1, max_value=50, default=10, required=False)


class LeaderboardEntrySerializer(serializers.Serializer):
    """Leaderboard row (API output / cached JSON)."""

    rank = serializers.IntegerField()
    user_id = serializers.IntegerField()
    username = serializers.CharField()
    full_name = serializers.CharField()
    score = serializers.FloatField()
    correct_answers = serializers.IntegerField()
    wrong_answers = serializers.IntegerField(allow_null=True, required=False)
    skipped_questions = serializers.IntegerField(allow_null=True, required=False)


class LeaderboardMeSerializer(serializers.Serializer):
    """Current user's attempt summary on the leaderboard endpoint (auth only)."""

    user_id = serializers.IntegerField()
    submitted = serializers.BooleanField()
    rank = serializers.IntegerField(allow_null=True)
    score = serializers.FloatField(allow_null=True)
    correct_answers = serializers.IntegerField(allow_null=True)
    wrong_answers = serializers.IntegerField(allow_null=True, required=False)
    skipped_questions = serializers.IntegerField(allow_null=True, required=False)
    username = serializers.CharField()
    full_name = serializers.CharField()
