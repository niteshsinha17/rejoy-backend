import re
from typing import Any

from rejoy_ai.constants.answer_format import AnswerFormat

DESCRIPTION_MAX_LENGTH = 200

_PATIENT_DISCLAIMER_PATTERNS = (
    r"(?i)(?:^|\n)\s*(?:⚠️|️)?\s*\*?\*?disclaimer:?\*?\*?[^\n]*(?:consult|healthcare professional|medical advice|not a substitute|see a doctor|seek (?:medical|professional))[^\n]*(?:\n|$)",
    r"(?i)(?:^|\n)\s*[^\n]*(?:always consult a qualified healthcare professional|this is not medical advice|not a substitute for professional medical advice)[^\n]*(?:\n|$)",
)


def _strip_patient_disclaimers(markdown: str) -> str:
    for pattern in _PATIENT_DISCLAIMER_PATTERNS:
        markdown = re.sub(pattern, "\n", markdown)
    return markdown


def _strip_standalone_horizontal_rules(markdown: str) -> str:
    lines = []
    for line in markdown.splitlines():
        stripped = line.strip()
        if "|" in stripped:
            lines.append(line)
            continue
        if re.match(r"^[\s\-*_]{3,}$", stripped):
            continue
        lines.append(line)
    return "\n".join(lines)


def sanitize_answer_markdown(markdown: str) -> str:
    markdown = _strip_patient_disclaimers(markdown)
    markdown = re.sub(
        r"[\U0001F300-\U0001FAFF\U00002600-\U000027BF]", "", markdown
    )
    markdown = re.sub(r"(<br\s*/?>\s*)+", "\n", markdown, flags=re.IGNORECASE)
    markdown = _strip_standalone_horizontal_rules(markdown)
    markdown = re.sub(r"\n{3,}", "\n\n", markdown)
    return markdown.strip()


def wrap_markdown_answer(answer_markdown: str) -> dict[str, Any]:
    return {
        "format_version": AnswerFormat.MARKDOWN,
        "answer_markdown": sanitize_answer_markdown(answer_markdown),
    }


def get_answer_format(text: Any) -> AnswerFormat:
    if isinstance(text, dict) and text.get("format_version") == AnswerFormat.MARKDOWN:
        return AnswerFormat.MARKDOWN
    return AnswerFormat.STRUCTURED_BLOCKS


def _strip_markdown(markdown: str) -> str:
    plain = re.sub(r"[#*_>`\[\]()]", "", markdown)
    plain = re.sub(r"\s+", " ", plain)
    return plain.strip()


def get_thread_description(text: Any) -> str:
    if get_answer_format(text) == AnswerFormat.MARKDOWN:
        preview = _strip_markdown(text.get("answer_markdown", ""))
        return preview[:DESCRIPTION_MAX_LENGTH]

    if not isinstance(text, list):
        return ""

    for block in text:
        if block.get("type") == "text" and block.get("text"):
            return str(block["text"])[:DESCRIPTION_MAX_LENGTH]

    return ""
