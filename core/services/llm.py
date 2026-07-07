from langchain_anthropic import ChatAnthropic

from core.constants.common import ANTHROPIC_API_KEY

DEFAULT_CLAUDE_MODEL = "claude-sonnet-4-6"
DEFAULT_MAX_TOKENS = 8192
REJOY_AI_MAX_TOKENS = 4096


def get_chat_llm(
    *,
    temperature: float = 0.3,
    model: str | None = None,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> ChatAnthropic:
    return ChatAnthropic(
        model=model or DEFAULT_CLAUDE_MODEL,
        temperature=temperature,
        api_key=ANTHROPIC_API_KEY,
        max_tokens=max_tokens,
    )
