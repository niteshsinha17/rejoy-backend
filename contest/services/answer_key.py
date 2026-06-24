"""Answer key ingest and result generation (admin / management flows)."""

from __future__ import annotations

import json

from django.db import transaction

from contest.exceptions import (
    AnswerKeyIncompleteError,
    AnswerKeyUploadError,
    ContestQuestionsNotLoadedError,
)
from contest.models import Contest, ContestAttempt
from contest.schemas import parse_answer_key_rows, parse_contest_questions_json


@transaction.atomic
def generate_results(contest: Contest) -> dict:
    answer_map = contest.answer_key_json or {}
    if len(answer_map) != contest.total_questions:
        raise AnswerKeyIncompleteError(
            f"The answer key is incomplete: {len(answer_map)} of {contest.total_questions} "
            "questions have official answers. Every contest question needs an entry before results can be generated."
        )
    n = ContestAttempt.objects.filter(contest=contest).count()
    contest.leaderboard_cache_payload = []
    contest.leaderboard_cache_computed_at = None
    contest.save(update_fields=["leaderboard_cache_payload", "leaderboard_cache_computed_at"])
    return {"participants": n}


@transaction.atomic
def upload_answer_key_json(contest: Contest, rows: list | None) -> dict:
    """
    Superuser: accept parsed JSON array (same shape as question export),
    merge metadata into questions_json, store answer_key_json, clear leaderboard cache.
    """
    validated_rows = parse_answer_key_rows(rows)
    if not contest.questions_json:
        raise ContestQuestionsNotLoadedError(
            "Load contest questions from the question bank before uploading an answer key."
        )
    question_records = parse_contest_questions_json(contest.questions_json)
    by_id = {r.id: i for i, r in enumerate(question_records)}
    for row in validated_rows:
        if row.id not in by_id:
            raise AnswerKeyUploadError(
                f"The file references question id {row.id!r}, which is not part of this contest's question set."
            )

    questions = [qr.model_dump(mode="python") for qr in question_records]
    for row in validated_rows:
        idx = by_id[row.id]
        row_dict = row.model_dump(mode="python")
        for k in ("exp", "choice_type", "subject_name", "topic_name"):
            if k in row_dict and row_dict[k] is not None:
                questions[idx][k] = row_dict[k]

    answer_map = {row.id: row.cop for row in validated_rows}
    contest.questions_json = questions
    contest.answer_key_json = answer_map
    contest.save(update_fields=["questions_json", "answer_key_json"])

    return generate_results(contest=contest)


def upload_answer_key_file(contest: Contest, file_obj) -> dict:
    raw = file_obj.read()
    if isinstance(raw, bytes):
        raw = raw.decode("utf-8")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        raise AnswerKeyUploadError(
            f"The file is not valid JSON. Fix the syntax and try again. ({e})"
        ) from e
    return upload_answer_key_json(contest, data)
