from urllib.parse import urlparse

from pydantic import BaseModel, Field, model_validator

from core.services.llm import REJOY_AI_MAX_TOKENS, get_chat_llm
from rejoy_ai.enitty import RejoyAIResponse
from rejoy_ai.services.response_format import wrap_markdown_answer


class Source(BaseModel):
    title: str
    url: str
    description: str = Field(description="Brief source summary in 35-45 words")
    favicon: str = ""
    domain: str = ""

    @model_validator(mode="after")
    def fill_domain_favicon(self):
        if self.url:
            netloc = urlparse(self.url).netloc
            if netloc and not self.domain:
                self.domain = netloc.removeprefix("www.")
            if netloc and not self.favicon:
                self.favicon = f"https://{netloc}/favicon.ico"
        return self


class GetQueryOutputSchema(BaseModel):
    error: bool = Field(description="True if input not related to medical domain")
    query: str = Field(
        description="Modified Search query for better results. Keep within 100 characters"
    )
    sources: list[Source] = Field(
        description="Exactly 4 reference links (at most one video)"
    )
    follow_ups: list[str] = Field(
        description="Exactly 3 follow-up questions"
    )
    answer_markdown: str = Field(
        description=(
            "Concise GFM markdown for clinicians. Brief intro (1-2 sentences), then 2-4 "
            "## sections with short bullet lists. Optional pipe table for comparisons. "
            "Keep total answer under 500 words. No HTML, --- rules, emojis, or disclaimers."
        )
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
                    "url": "https://www.mayoclinic.org/drugs-supplements-fish-oil/art-20364810",
                    "description": "Fish oil is known for its high omega-3 fatty acid content, which is beneficial for heart health, reducing inflammation, and supporting brain function.",
                    "favicon": "https://www.mayoclinic.org/favicon.ico",
                    "domain": "mayoclinic.org",
                },
            ],
            follow_ups=[
                "What are the best sources of omega-3 fatty acids?",
                "How much fish oil should I take daily?",
            ],
            text=wrap_markdown_answer(
                "## Fish oil benefits\n\n"
                "Fish oil is rich in **omega-3 fatty acids**, which support heart and brain health.\n\n"
                "### Key benefits\n\n"
                "- Reduces inflammation\n"
                "- Supports cardiovascular health\n"
                "- May improve mental health"
            ),
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
        history = ""
        if len(question_history) == 0:
            history = "No history"
        else:
            for query in question_history:
                history += query
                history += "\n"

        template = f"""
You are Rejoy AI for licensed clinicians. Answer medical, food, health, and medicine queries concisely.
Use your medical knowledge; cite exactly 4 reputable sources (never webmd.com or healthline.com).
If the query is not medical, set error to true.

User inputs history:
{history}

Input: {input}
"""
        llm = get_chat_llm(
            temperature=0.3, max_tokens=REJOY_AI_MAX_TOKENS
        ).with_structured_output(GetQueryOutputSchema)
        result = llm.invoke(template)
        data = result.model_dump()
        answer_markdown = data.pop("answer_markdown")
        data["text"] = wrap_markdown_answer(answer_markdown)
        return data
