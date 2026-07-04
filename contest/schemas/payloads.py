"""Pydantic models for contest-related JSON (questions, answer keys, leaderboard)."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict, Field, TypeAdapter, field_validator, model_validator


class ContestQuestionPayload(BaseModel):
    """
    One row in ``Contest.questions_json`` (question-bank export shape).
    ``cop`` (correct option) is required on every question at ingest time.
    ``extra='allow'`` keeps forward-compatible fields from the QB without listing them all.
    """

    model_config = ConfigDict(extra="allow")

    id: str = Field(..., min_length=1)
    question: str
    opa: str
    opb: str
    opc: str
    opd: str
    choice_type: str = "single"
    exp: str | None = None
    cop: list[int]

    @field_validator("cop", mode="before")
    @classmethod
    def validate_cop(cls, v: Any) -> list[int]:
        from contest.services.scoring import normalize_cop

        return normalize_cop(v)

    @model_validator(mode="after")
    def validate_single_choice_cop(self) -> "ContestQuestionPayload":
        from contest.exceptions import InvalidCorrectOptionError

        if (self.choice_type or "single").strip().lower() != "multi" and len(self.cop) > 1:
            raise InvalidCorrectOptionError(
                f"Question {self.id!r} is not multi-select but has more than one correct option. "
                "Only choice_type 'multi' questions may have multiple correct answers."
            )
        return self


class AnswerKeyRowPayload(BaseModel):
    """One object in the answer-key upload array (id + cop required; other keys merged into questions_json)."""

    model_config = ConfigDict(extra="allow")

    id: str = Field(..., min_length=1)
    cop: list[int]

    @field_validator("cop", mode="before")
    @classmethod
    def validate_cop(cls, v: Any) -> list[int]:
        from contest.services.scoring import normalize_cop

        return normalize_cop(v)


class LeaderboardEntryPayload(BaseModel):
    """One row in ``Contest.leaderboard_cache_payload`` and the leaderboard API response."""

    model_config = ConfigDict(extra="forbid")

    rank: int = Field(..., ge=1)
    user_id: int = Field(..., ge=1)
    username: str
    full_name: str
    score: float
    correct_answers: int = Field(..., ge=0)
    #: Set when an answer key exists; omitted / null for provisional leaderboards
    wrong_answers: int | None = Field(default=None, ge=0)
    skipped_questions: int | None = Field(default=None, ge=0)


ContestQuestionsAdapter: TypeAdapter[list[ContestQuestionPayload]] = TypeAdapter(list[ContestQuestionPayload])
AnswerKeyRowsAdapter: TypeAdapter[list[AnswerKeyRowPayload]] = TypeAdapter(list[AnswerKeyRowPayload])
LeaderboardEntriesAdapter: TypeAdapter[list[LeaderboardEntryPayload]] = TypeAdapter(list[LeaderboardEntryPayload])
