from core.models import User
from rejoy_ai.models import Thread, ThreadMessage
from rejoy_ai.services.ai import RejoyAi


class ThreadService:

    def initialize_thread(self, user: User, input: str):
        ai = RejoyAi()
        response = ai.create_response(input)
        if response.error:
            return (None, response)
        description = ""
        text = response.text or []
        for block in text:
            if block["type"] == "text":
                description = block["text"]
                break

        thread = Thread.objects.create(
            user=user, query=response.query, description=description
        )
        message = ThreadMessage.objects.create(
            thread=thread,
            input=input,
            query=response.query,
            sources=response.sources,
            text=response.text,
        )

        response.id = message.pk

        return (thread, response)

    def add_message(self, thread: Thread, input: str):
        last_5_messages = ThreadMessage.objects.filter(thread=thread).order_by(
            "-created_at"
        )[:10]

        asked_questions = []

        for msg in last_5_messages:
            asked_questions.append(msg.input)

        ai = RejoyAi()
        response = ai.create_response(input, question_history=asked_questions)
        if response.error:
            return response
        message = ThreadMessage.objects.create(
            thread=thread,
            input=input,
            query=response.query,
            sources=response.sources,
            text=response.text,
        )

        response.id = message.pk

        return response
