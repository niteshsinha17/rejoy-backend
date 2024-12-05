from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from common.apis import BaseApi
from rejoy_ai.models import Thread, ThreadMessage
from rejoy_ai.serializers.response import ThreadListSerializer
from rejoy_ai.services.thread import ThreadService


class InitializeThreadApi(BaseApi):

    class InputSerializer(serializers.Serializer):
        input = serializers.CharField()

    input_serializer_class = InputSerializer

    def post(self, request):
        data = self.validate_input_data()
        input = data.get("input")
        thread_service = ThreadService()
        (thread, message) = thread_service.initialize_thread(
            user=request.user, input=input
        )

        return Response(
            data={
                "response": {
                    "id": message.id,
                    "error": message.error,
                    "error_message": message.error_message,
                    "error_description": message.error_description,
                    "input": message.input,
                    "query": message.query,
                    "sources": message.sources,
                    "follow_ups": message.follow_ups,
                    "text": message.text,
                },
                "thread_slug": thread.slug if thread else None,
            }
        )


class ThreadListApi(ListModelMixin, BaseApi):
    pagination_class = LimitOffsetPagination
    serializer_class = ThreadListSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        user = self.get_user()
        return Thread.objects.filter(user=user).order_by("-created_at")


class ThreadMessageApi(BaseApi):
    page_size = 5

    def get(self, request, thread_slug):
        # commented pagination code
        # return all messages

        thread = get_object_or_404(Thread, slug=thread_slug)
        messages = ThreadMessage.objects.filter(thread=thread).order_by("created_at")

        data = {
            "results": [
                {
                    "id": message.pk,
                    "input": message.input,
                    "query": message.query,
                    "sources": message.sources,
                    "text": message.text,
                    "created_at": message.created_at,
                }
                for message in messages
            ],
            "next": {"start": None, "end": None},
        }

        return Response(data)

        # start_cursor = request.GET.get("start")
        # end_cursor = request.GET.get("end")

        # thread = get_object_or_404(Thread, slug=thread_slug)
        # messages = ThreadMessage.objects.filter(thread=thread).order_by("created_at")
        # total_messages = messages.count()

        # if total_messages == 0:
        #     # No messages in the thread
        #     return Response({"results": [], "next": {"start": None, "end": None}})

        # if start_cursor is None and end_cursor is None:
        #     # Initial request with no cursors provided
        #     if total_messages <= self.page_size * 2:
        #         # If there are fewer than 10 items, return all of them without pagination
        #         results = messages
        #         next_cursors = {"start": None, "end": None}
        #     else:
        #         # If more than 10 items, fetch top and bottom `page_size` items
        #         top_messages = messages[: self.page_size]
        #         bottom_messages = messages.reverse()[: self.page_size]
        #         results = list(top_messages) + list(bottom_messages)
        #         next_cursors = {
        #             "start": top_messages.last().pk if top_messages else None,
        #             "end": (
        #                 messages.last().pk - self.page_size + 1
        #                 if messages.exists()
        #                 else None
        #             ),
        #         }
        # else:
        #     # Convert start and end cursors to integers if provided
        #     start_cursor = int(start_cursor) if start_cursor else None
        #     end_cursor = int(end_cursor) if end_cursor else None

        #     # If both start and end are provided, get the range in-between
        #     if start_cursor and end_cursor:
        #         results = messages.filter(
        #             Q(id__gt=start_cursor) & Q(id__lt=end_cursor)
        #         )[: self.page_size]
        #         next_cursors = {
        #             "start": results.last().id if results else None,
        #             "end": end_cursor,
        #         }
        #     else:
        #         # Handle cases with incomplete cursor values
        #         results = []
        #         next_cursors = {"start": None, "end": None}

        # data = {
        #     "results": [
        #         {
        #             "id": message.pk,
        #             "input": message.input,
        #             "query": message.query,
        #             "sources": message.sources,
        #             "text": message.text,
        #             "created_at": message.created_at,
        #         }
        #         for message in results
        #     ],  # Assuming a `serialize()` method for your model
        #     "next": next_cursors,
        # }

        # return Response(data)


class ThreadGenerateResponseApi(BaseApi):
    class InputSerializer(serializers.Serializer):
        input = serializers.CharField()

    input_serializer_class = InputSerializer

    def post(self, request, thread_slug):
        user = self.get_user()
        thread = get_object_or_404(Thread, slug=thread_slug, user=user)
        data = self.validate_input_data()
        input = data.get("input")
        thread_service = ThreadService()
        message = thread_service.add_message(thread=thread, input=input)

        return Response(
            data={
                "id": message.id,
                "error": message.error,
                "error_message": message.error_message,
                "error_description": message.error_description,
                "input": message.input,
                "query": message.query,
                "sources": message.sources,
                "follow_ups": message.follow_ups,
                "text": message.text,
            }
        )
