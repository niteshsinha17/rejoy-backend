from dataclasses import dataclass
from typing import Optional


@dataclass
class RejoyAIResponse:
    id: Optional[int]
    error: bool
    error_message: Optional[str]
    error_description: Optional[str]
    input: str
    query: Optional[str]
    sources: Optional[list[dict]]
    follow_ups: Optional[list[str]]
    text: Optional[list[dict] | dict]
