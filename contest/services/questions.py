"""Question list payloads for practice and live attempts."""

from contest.exceptions import ContestJsonValidationError, ContestQuestionsNotLoadedError, PracticeNotAvailableError
from contest.models import Contest, ContestStatus
from contest.schemas import parse_contest_questions_json


def get_contest_answer_key_map(contest: Contest) -> dict[str, list[int]]:
    """
    Return ``question_id -> sorted correct options`` when a full key is available.

    Prefers ``answer_key_json`` when complete; otherwise derives from ``cop`` in
    ``questions_json`` (required on every question at ingest time).
    """
    total = contest.total_questions
    if total <= 0:
        return {}

    stored = contest.answer_key_json or {}
    if len(stored) == total:
        return {
            str(qid): sorted(int(x) for x in (opts or []))
            for qid, opts in stored.items()
        }

    if not contest.questions_json:
        return {}
    try:
        records = parse_contest_questions_json(contest.questions_json)
    except ContestJsonValidationError:
        return {}
    if len(records) != total:
        return {}
    return {str(record.id): list(record.cop) for record in records}


def contest_question_choice_type(contest: Contest, question_id: str) -> str | None:
    """
    Return normalized ``choice_type`` for ``question_id`` in ``contest.questions_json``,
    or ``None`` if the id is not in the set.
    """
    if not contest.questions_json:
        return None
    qid = str(question_id)
    for record in parse_contest_questions_json(contest.questions_json):
        if str(record.id) == qid:
            raw = (record.choice_type or "single").strip().lower()
            return raw if raw else "single"
    return None


def build_question_list(contest: Contest, reveal: bool) -> list:
    """Build question dicts from questions_json; merge answer keys when revealing solutions."""
    keys_map: dict[str, list] = {}
    if reveal:
        keys_map = get_contest_answer_key_map(contest)
    questions: list = []
    if not contest.questions_json:
        return questions
    records = parse_contest_questions_json(contest.questions_json)
    for record in records:
        q_copy = record.model_dump(mode="python")
        if not reveal:
            q_copy.pop("cop", None)
            q_copy.pop("exp", None)
        else:
            opts = keys_map.get(str(q_copy.get("id")))
            if opts:
                sopts = sorted(int(x) for x in opts)
                q_copy["cop"] = sopts[0] if len(sopts) == 1 else sopts
        questions.append(q_copy)
    return questions


def get_practice_payload(contest: Contest) -> dict:
    """
    Virtual / practice mode: question list only, no contest attempt created.
    Only allowed after the contest has finished (ended or results released).
    """
    if contest.status != ContestStatus.ENDED:
        raise PracticeNotAvailableError(
            "Practice opens only after this contest has ended. Check back once the contest window is over."
        )
    if not contest.questions_json:
        raise ContestQuestionsNotLoadedError(
            "This contest has no questions loaded yet. They must be fetched from the question bank first."
        )
    reveal = contest.status == ContestStatus.ENDED
    return {
        "slug": contest.slug,
        "title": contest.title,
        "course": contest.course,
        "duration_minutes": contest.duration_minutes,
        "total_questions": contest.total_questions,
        "questions": build_question_list(contest, reveal),
    }
