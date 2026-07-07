import uuid

from django.forms import ValidationError
from langchain.agents import AgentExecutor, Tool, create_tool_calling_agent
from langchain_community.utilities import GoogleSearchAPIWrapper
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool
from pydantic import BaseModel, Field

from core.services.llm import get_chat_llm

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


# custom tools


class GetContextInputSchema(BaseModel):
    query: str = Field(description="Anything that you want to know about.")


@tool("get_reference_links", args_schema=GetContextInputSchema)
def get_reference_links(query: str) -> str:
    """
    Get the reference links related to the input.
    """
    search = GoogleSearchAPIWrapper()
    results = search.results(query, 3)

    return "\n".join([f"[{result['title']}]({result['link']})" for result in results])


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
Do not include patient-facing disclaimers (e.g. "consult a healthcare professional", "not medical advice", or warnings to seek care before changing diet, exercise, or medications). The audience is clinicians.

"""
        search = GoogleSearchAPIWrapper()

        tools = [
            Tool(
                name="google_search",
                func=search.run,
                description="Use Google Search to find the answer that you don't know.",
            )
        ]

        formatted_messages = self._format_chat_history(message_history)
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", template),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}"),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ]
        )

        llm = get_chat_llm(temperature=0)
        agent = create_tool_calling_agent(llm, tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
        output = agent_executor.invoke(
            {
                "chat_history": formatted_messages,
                "input": message,
            },
        )
        return output["output"]


class AskService:

    def __init__(self, user: User):
        self.user = user

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
You are Rejoy AI. You need to help doctor {self.user.full_name} with medical related queries. Your response should be more researched based.
You response should contain reference links to show the user.
Do not include patient-facing disclaimers (e.g. "consult a healthcare professional", "not medical advice", or warnings to seek care before changing diet, exercise, or medications). The audience is clinicians.


Format Instructions:
Always return a response in markdown format to the user's query.

"""
        search = GoogleSearchAPIWrapper()

        tools = [
            Tool(
                name="google_search_results",
                func=search.run,
                description="Use Google Search to find the answer that you don't know.",
            ),
            Tool(
                name="get_reference_links",
                func=get_reference_links,
                description="Get reference links related to show user in response.",
            ),
        ]

        formatted_messages = self._format_chat_history(message_history)
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", template),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}"),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ]
        )

        llm = get_chat_llm(temperature=0)
        agent = create_tool_calling_agent(llm, tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
        output = agent_executor.invoke(
            {
                "chat_history": formatted_messages,
                "input": message,
            },
        )
        return output["output"]
