"""Validate and parse contest JSON at boundaries (DB / HTTP / cache)."""

from __future__ import annotations

from typing import Any

from pydantic import ValidationError as PydanticValidationError

from contest.exceptions import ContestJsonValidationError
from contest.schemas.payloads import (
    AnswerKeyRowsAdapter,
    ContestQuestionsAdapter,
    LeaderboardEntriesAdapter,
    LeaderboardEntryPayload,
)


def _format_pydantic_error(exc: PydanticValidationError) -> str:
    parts: list[str] = []
    for err in exc.errors()[:5]:
        loc = ".".join(str(x) for x in err.get("loc", ()) if x != "__root__")
        msg = err.get("msg", "invalid")
        parts.append(f"{loc}: {msg}" if loc else msg)
    more = len(exc.errors()) - 5
    if more > 0:
        parts.append(f"(+{more} more)")
    return "; ".join(parts) if parts else "Invalid JSON payload"


def parse_contest_questions_json(data: Any) -> list[ContestQuestionPayload]:
    if not isinstance(data, list):
        raise ContestJsonValidationError("questions_json must be a JSON array of question objects.")
    try:
        return ContestQuestionsAdapter.validate_python(data)
    except PydanticValidationError as e:
        raise ContestJsonValidationError(_format_pydantic_error(e)) from e


def parse_answer_key_rows(rows: Any) -> list[AnswerKeyRowPayload]:
    if not isinstance(rows, list):
        raise ContestJsonValidationError(
            "Answer key body must be a JSON array of objects with id and cop fields."
        )
    try:
        return AnswerKeyRowsAdapter.validate_python(rows)
    except PydanticValidationError as e:
        raise ContestJsonValidationError(_format_pydantic_error(e)) from e


def parse_leaderboard_payload(data: Any) -> list[LeaderboardEntryPayload]:
    if not isinstance(data, list):
        raise ContestJsonValidationError("Leaderboard cache payload must be a JSON array.")
    try:
        return LeaderboardEntriesAdapter.validate_python(data)
    except PydanticValidationError as e:
        raise ContestJsonValidationError(_format_pydantic_error(e)) from e


def leaderboard_entries_to_jsonable(entries: list[LeaderboardEntryPayload]) -> list[dict]:
    return [e.model_dump(mode="json") for e in entries]
