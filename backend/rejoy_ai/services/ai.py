import json
from typing import Optional

from langchain.output_parsers import PydanticOutputParser
from langchain.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

from rejoy_ai.enitty import RejoyAIResponse
import os

os.environ["HTTP_PROXY"] = "http://proxy.com:8080"
os.environ["HTTPS_PROXY"] = "http://proxy.com:8080"


class Source(BaseModel):
    title: str
    url: str
    description: str = Field(description="Some Segment of the source in 70-100 words")
    favicon: str
    domain: str


class Response(BaseModel):
    sources: list[int] = Field(
        description="Indexes from sources list. Add when possible"
    )
    text: str = Field(
        description="html for making text bold, italic etc. Do not include p, html, table, h1, h2, etc tags. Use type to specify type of text"
    )
    type: str = Field(description="Type of response. Can be text, list and table")
    list_items: Optional[list[str]]
    heading: Optional[str] = Field(
        description="use this for specify heading of list or table or start of para if needed."
    )
    table_columns: Optional[list[str]]
    table_rows: Optional[list[list[str]]]


class GetQueryOutputSchema(BaseModel):
    error: bool = Field(description="True if input not related to medical domain")
    query: str = Field(
        description="Modified Search query for better results. Keep within 100 characters"
    )
    sources: list[Source] = Field(
        description="List of sources to show user in response"
    )
    follow_ups: list[str] = Field(
        description="List of follow up questions to show user in response"
    )
    text: list[Response] = Field(
        description="Detailed response that can parsed to show user in structured format"
    )


class RejoyAi:

    def fake_response(
        self, input: str, question_history: list[str] = []
    ) -> RejoyAIResponse:
        return RejoyAIResponse(
            id=-1,
            error=False,
            input=input,
            error_message="",
            error_description="",
            query="Benefits of fish oil for health",
            sources=[
                {
                    "title": "Health Benefits of Fish Oil",
                    "url": "https://www.healthline.com/nutrition/13-benefits-of-fish-oil",
                    "description": "Fish oil is known for its high omega-3 fatty acid content, which is beneficial for heart health, reducing inflammation, and supporting brain function. Studies suggest it may help lower blood pressure and triglycerides.",
                    "favicon": "https://www.healthline.com/favicon.ico",
                    "domain": "healthline.com",
                },
                {
                    "title": "Fish Oil: Uses, Benefits & Side Effects",
                    "url": "https://www.webmd.com/diet/ss/slideshow-fish-oil",
                    "description": "Fish oil supplements are often used to support cardiovascular health, improve mental health, and reduce inflammation. They are also used in the management of certain mental health conditions.",
                    "favicon": "https://www.webmd.com/favicon.ico",
                    "domain": "webmd.com",
                },
                {
                    "title": "Omega-3 Fatty Acids: An Essential Contribution",
                    "url": "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/",
                    "description": "Omega-3 fatty acids, found in fish oil, are essential fats that have numerous health benefits, including reducing the risk of heart disease, supporting mental health, and reducing inflammation.",
                    "favicon": "https://ods.od.nih.gov/favicon.ico",
                    "domain": "ods.od.nih.gov",
                },
                {
                    "title": "The Benefits of Fish Oil: A Closer Look",
                    "url": "https://www.mayoclinic.org/drugs-supplements-fish-oil/art-20364810",
                    "description": "Fish oil is rich in omega-3 fatty acids, which are crucial for maintaining heart health, reducing inflammation, and supporting cognitive function. It may also aid in managing depression and anxiety.",
                    "favicon": "https://www.mayoclinic.org/favicon.ico",
                    "domain": "mayoclinic.org",
                },
            ],
            follow_ups=[
                "What are the best sources of omega-3 fatty acids?",
                "How much fish oil should I take daily?",
                "Are there any side effects of fish oil supplements?",
                "Can fish oil help with joint pain?",
            ],
            text=[
                {
                    "sources": [0, 1, 2, 3],
                    "text": "Fish oil is renowned for its high content of omega-3 fatty acids, which are essential for various bodily functions.",
                    "type": "text",
                    "list_items": None,
                    "heading": None,
                    "table_columns": None,
                    "table_rows": None,
                },
                {
                    "sources": [0, 1],
                    "text": "Some of the key benefits of fish oil include:",
                    "type": "list",
                    "list_items": [
                        "Improving heart health by reducing triglycerides and blood pressure.",
                        "Supporting brain function and mental health.",
                        "Reducing inflammation in the body.",
                        "Potentially aiding in the management of depression and anxiety.",
                    ],
                    "heading": None,
                    "table_columns": None,
                    "table_rows": None,
                },
                {
                    "sources": [2, 3],
                    "text": "Omega-3 fatty acids in fish oil are crucial for maintaining overall health and preventing chronic diseases.",
                    "type": "text",
                    "list_items": None,
                    "heading": None,
                    "table_columns": None,
                    "table_rows": None,
                },
            ],
        )

    def create_response(
        self, input: str, question_history: list[str] = []
    ) -> RejoyAIResponse:
        response = self._generate_response(input, question_history)
        error = response["error"]
        if error:
            return RejoyAIResponse(
                id=-1,
                error=True,
                error_message="Input not related to medical domain",
                error_description="Please ask medical related queries",
                input=input,
                query=response["query"],
                sources=[],
                text=[],
                follow_ups=[],
            )

        return RejoyAIResponse(
            id=-1,
            error=False,
            input=input,
            query=response["query"],
            sources=response["sources"],
            text=response["text"],
            follow_ups=response["follow_ups"],
            error_description=None,
            error_message=None,
        )

    def _generate_response(self, input: str, question_history: list[str]):
        output_parser = PydanticOutputParser(pydantic_object=GetQueryOutputSchema)

        history = ""
        if len(question_history) == 0:
            history = "No history"
        else:
            for query in question_history:
                history += query
                history += "\n"

        template = f"""
You are Rejoy AI that help user with only medical, food, health, medicine related queries. Your response should be more researched based. 
Search over internet to construct your response. Include 4-7 reference links including videos (if available) and follow up questions that user can ask in your response.
If  query is not related to medical domain, return error. Also understand user input history.

{output_parser.get_format_instructions()}

User inputs history:
{history}


Input: {input}
"""
        llm = ChatOpenAI(temperature=0.3, model="gpt-4o")
        print("here")
        response = llm.invoke(template)
        print(response)
        data = json.loads(output_parser.parse(str(response.content)).json())
        return data
