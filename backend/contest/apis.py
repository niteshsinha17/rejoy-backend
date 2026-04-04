from django.core.paginator import EmptyPage, Paginator
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from common.apis import BaseApi, OpenApi, OptionalAuthApi
from common.exceptions import BaseValidationError
from contest.models import Contest, ContestAttempt
from contest.serializers import (
    AnswerInputSerializer,
    ContestAnswerResponseSerializer,
    ContestDetailSerializer,
    ContestListSerializer,
    ContestListQuerySerializer,
    ContestPracticeResponseSerializer,
    ContestResultSerializer,
    ContestStartResponseSerializer,
    LeaderboardEntrySerializer,
    LeaderboardMeSerializer,
    LeaderboardQuerySerializer,
)
from contest.services import ContestService


def _participated_contest_ids_for_user(request, contests: list) -> frozenset:
    if not getattr(request.user, "is_authenticated", False):
        return frozenset()
    ids = [c.pk for c in contests]
    if not ids:
        return frozenset()
    return frozenset(
        ContestAttempt.objects.filter(
            user=request.user,
            contest_id__in=ids,
        ).values_list("contest_id", flat=True)
    )


class ContestListApi(OptionalAuthApi):
    query_params_serializer_class = ContestListQuerySerializer

    def get(self, request, *args, **kwargs):
        params = self.validate_query_params()
        list_type = params["type"]

        if list_type == ContestListQuerySerializer.LIST_TYPE_UPCOMING_OR_LIVE:
            contests = ContestService.get_upcoming_or_live()
            serializer = ContestListSerializer(
                contests,
                many=True,
                context=self.get_serializer_context(),
            )
            return Response(data={"results": serializer.data}, status=HTTP_200_OK)

        return_all = params["return_all"]
        past = ContestService.get_past()

        if return_all:
            ctx = self.get_serializer_context()
            ctx["participated_contest_ids"] = _participated_contest_ids_for_user(request, past)
            serializer = ContestListSerializer(past, many=True, context=ctx)
            return Response(
                data={
                    "count": len(past),
                    "next": None,
                    "previous": None,
                    "results": serializer.data,
                },
                status=HTTP_200_OK,
            )

        page = params["page"]
        page_size = params["page_size"]

        paginator = Paginator(past, page_size)
        try:
            page_obj = paginator.page(page)
        except EmptyPage:
            page_obj = paginator.page(paginator.num_pages) if paginator.num_pages else []

        past_items = page_obj.object_list if paginator.count else []
        ctx = self.get_serializer_context()
        ctx["participated_contest_ids"] = _participated_contest_ids_for_user(request, past_items)
        past_serializer = ContestListSerializer(past_items, many=True, context=ctx)

        next_page = page_obj.next_page_number() if paginator.count and page_obj.has_next() else None
        previous_page = page_obj.previous_page_number() if paginator.count and page_obj.has_previous() else None

        return Response(
            data={
                "count": paginator.count,
                "next": next_page,
                "previous": previous_page,
                "results": past_serializer.data,
            },
            status=HTTP_200_OK,
        )


class ContestDetailApi(OptionalAuthApi):
    def get(self, request, slug, *args, **kwargs):
        contest = get_object_or_404(Contest, slug=slug)
        user = request.user if request.user.is_authenticated else None
        detail = ContestService.get_detail(slug=slug, user=user)
        serializer = ContestDetailSerializer(
            contest,
            context={"user_state": detail},
        )
        return Response(data=serializer.data, status=HTTP_200_OK)


class ContestPracticeApi(OpenApi):
    """Virtual / practice MCQ: full question list, no DB attempt or answers."""

    def get(self, request, slug, *args, **kwargs):
        contest = get_object_or_404(Contest, slug=slug)
        try:
            payload = ContestService.get_practice_payload(contest)
        except BaseValidationError as e:
            return self.error_response(e)
        serializer = ContestPracticeResponseSerializer(data=payload)
        serializer.is_valid(raise_exception=True)
        return Response(data=serializer.data, status=HTTP_200_OK)


class ContestStartApi(BaseApi):
    def post(self, request, slug, *args, **kwargs):
        contest = get_object_or_404(Contest, slug=slug)
        user = self.get_user()
        try:
            data = ContestService.start_attempt(user=user, contest=contest)
        except BaseValidationError as e:
            return self.error_response(e)
        serializer = ContestStartResponseSerializer(data)
        return Response(data=serializer.data, status=HTTP_200_OK)


class ContestAnswerApi(BaseApi):
    input_serializer_class = AnswerInputSerializer

    def post(self, request, slug, *args, **kwargs):
        contest = get_object_or_404(Contest, slug=slug)
        user = self.get_user()
        validated = self.validate_input_data()
        try:
            result = ContestService.save_answer(
                user=user,
                contest=contest,
                question_id=validated["question_id"],
                is_skipped=validated.get("is_skipped", False),
                selected_options=validated.get("selected_options"),
            )
        except BaseValidationError as e:
            return self.error_response(e)
        serializer = ContestAnswerResponseSerializer(result)
        return Response(data=serializer.data, status=HTTP_200_OK)


class ContestSubmitApi(BaseApi):
    def post(self, request, slug, *args, **kwargs):
        contest = get_object_or_404(Contest, slug=slug)
        user = self.get_user()
        try:
            ContestService.submit_attempt(user=user, contest=contest)
        except BaseValidationError as e:
            return self.error_response(e)
        return Response(
            data={"message": "Attempt submitted successfully."},
            status=HTTP_200_OK,
        )


class ContestResultApi(BaseApi):
    def get(self, request, slug, *args, **kwargs):
        contest = get_object_or_404(Contest, slug=slug)
        user = self.get_user()
        try:
            data = ContestService.get_result(user=user, contest=contest)
        except BaseValidationError as e:
            return self.error_response(e)
        attempt = data["attempt"]
        serializer = ContestResultSerializer(
            {
                "score": data["score"],
                "correct_answers": data["correct_answers"],
                "rank": data["rank"],
                "total_participants": data["total_participants"],
                "submitted_at": attempt.submitted_at,
            }
        )
        return Response(data=serializer.data, status=HTTP_200_OK)


class ContestLeaderboardApi(OptionalAuthApi):
    """
    Live leaderboard for every ``ContestAttempt``. With an answer key, scores use the marking scheme;
    without a key, ranking is provisional (progress by answered questions). Tied scores share rank.
    Leaderboard rows are cached on the contest row for 5 minutes (live or ended), then rebuilt on the next request.
    Paginated with ``page`` and ``page_size`` (default 10, max 50).

    Optional auth: when logged in and a ``ContestAttempt`` exists, ``me`` mirrors the user's live row.
    """

    query_params_serializer_class = LeaderboardQuerySerializer

    def get(self, request, slug, *args, **kwargs):
        contest = get_object_or_404(Contest, slug=slug)
        params = self.validate_query_params()
        page = params["page"]
        page_size = params["page_size"]
        entries = ContestService.get_leaderboard(contest=contest)

        user = request.user if getattr(request.user, "is_authenticated", False) else None
        me_raw = ContestService.get_leaderboard_me_for_user(user, contest, entries)
        me_data = LeaderboardMeSerializer(me_raw).data if me_raw is not None else None

        paginator = Paginator(entries, page_size)
        if not paginator.count:
            return Response(
                data={
                    "count": 0,
                    "next": None,
                    "previous": None,
                    "results": [],
                    "me": me_data,
                },
                status=HTTP_200_OK,
            )
        try:
            page_obj = paginator.page(page)
        except EmptyPage:
            page_obj = paginator.page(paginator.num_pages)

        slice_entries = list(page_obj.object_list)
        serializer = LeaderboardEntrySerializer(slice_entries, many=True)
        next_page = (
            page_obj.next_page_number() if page_obj.has_next() else None
        )
        previous_page = (
            page_obj.previous_page_number() if page_obj.has_previous() else None
        )
        return Response(
            data={
                "count": paginator.count,
                "next": next_page,
                "previous": previous_page,
                "results": serializer.data,
                "me": me_data,
            },
            status=HTTP_200_OK,
        )
