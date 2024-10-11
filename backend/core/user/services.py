import uuid

from django.forms import ValidationError
from langchain.agents import AgentExecutor, Tool, create_openai_functions_agent
from langchain.prompts import MessagesPlaceholder, PromptTemplate
from langchain_community.callbacks import get_openai_callback
from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    PromptTemplate,
)
from langchain_openai import ChatOpenAI

from authentication.exceptions import EmailAlreadyExistsException
from core.models import DoctorProfile, User
from core.user.exceptions import UsernameNotAvailable
from core.utils import get_phone_number_with_country_code
from core.validators import username_validator


class CreateUserService:
    def check_username_available(self, username):
        if User.objects.filter(username=username).exists():
            raise UsernameNotAvailable("Username is not available")
        try:
            username_validator(username)
        except ValidationError:
            raise UsernameNotAvailable("Username is not available")

    def create_user(
        self,
        email: str,
        first_name: str,
        last_name: str,
        password: str,
        is_doctor: bool,
    ):
        existing_user = User.objects.filter(email=email).first()
        email_already_in_use = existing_user and existing_user.is_email_verified

        if email_already_in_use:
            raise EmailAlreadyExistsException("Email already in use")
        if existing_user:
            return existing_user

        user = existing_user or User.objects.create_user(
            username=str(uuid.uuid4()),
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            is_doctor=is_doctor,
        )

        if is_doctor:
            DoctorProfile.objects.create(user=user)
        return user

    def active_user(self, user: User):
        user.is_active = True
        user.is_email_verified = True
        user.save()
        # Event Notification
        #         send_mail(
        #             "New User Registration",
        #             f"""Hi,
        # A new user got registered on Neurality. Find details below.
        # User Email : {user.email}
        # User Name : {user.get_full_name()}
        # Username : {username}

        # Thanks,
        # Neurality Dev
        # """,
        #             [NOTIFICATION_EMAIL],
        #         )
        return user

    def create_guest_user(
        self, first_name: str, last_name: str, email: str, phone_number: str
    ):
        phone_number = get_phone_number_with_country_code(phone_number)
        return User.objects.create(
            username=uuid.uuid4(),
            guest_user=True,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
        )


class AgentService:

    def __init__(self, user: User):
        self.user = user
        self.doctor_detail = DoctorProfile.objects.get(user=user)

    def _format_chat_history(self, chat_history: list):
        messages = []
        for message in chat_history:
            is_agent_response = message["sender"] == "agent"
            if is_agent_response:
                messages.append(AIMessage(content=message["message"]))
            else:
                messages.append(HumanMessage(content=message["message"]))
        return messages

    def get_response(self, message_history, message):

        template = f"""
You are Dr. {self.user.get_full_name()} AI. You have been provided details of {self.user.get_full_name()}. Understand the Doctor's profile and provide the response
to user's query in order to help him/her with medical queries in a professional manner. Do not let user know you are using tool. Use tool when you don't know the answer.

Doctor's Profile:
Overview: {self.user.overview}
Address: {self.user.address}
Phone Number: {self.user.phone_number}
Specialties: {", ".join(self.doctor_detail.specialties)}
Conditions Treated: {", ".join(self.doctor_detail.conditions_treated)}
Procedures Performed: {", ".join(self.doctor_detail.procedures_performed)}
Insurance Accepted: {", ".join(self.doctor_detail.insurance_accepted)}


Format Instructions:
Always return a string response to the user's query.

"""
        search = GoogleSerperAPIWrapper()

        tools = [
            Tool(
                name="google_search",
                func=search.run,
                description="Useful for when you need to search for medical information on the web.",
            )
        ]

        formatted_messages = self._format_chat_history(message_history)
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(content=template),
                MessagesPlaceholder(variable_name="chat_history"),
                HumanMessagePromptTemplate(
                    prompt=PromptTemplate(input_variables=["input"], template="{input}")
                ),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ]
        )

        llm = ChatOpenAI(temperature=0, verbose=True, model="gpt-4")
        agent = create_openai_functions_agent(llm, tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
        with get_openai_callback() as callback:
            output = agent_executor.invoke(
                {
                    "chat_history": formatted_messages,
                    "input": message,
                },
            )
        return output["output"]
