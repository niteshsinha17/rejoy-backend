"""Scoring helpers: correct-option normalization and per-attempt marks."""

from contest.exceptions import InvalidCorrectOptionError
from contest.models import ContestAttempt, ContestQuestionAttempt, MarkingScheme


def normalize_cop(cop) -> list[int]:
    """Normalize uploaded `cop` to sorted unique option ids in 1..4."""
    if cop is None:
        raise InvalidCorrectOptionError(
            "Each answer-key row must include cop (correct option): missing for at least one question."
        )
    if isinstance(cop, bool):
        raise InvalidCorrectOptionError(
            "cop cannot be a boolean. Use an integer 1–4 or a list of integers 1–4."
        )
    if isinstance(cop, int):
        if cop not in (1, 2, 3, 4):
            raise InvalidCorrectOptionError(
                f"cop must be a choice index from 1 to 4; received {cop}."
            )
        return [cop]
    if isinstance(cop, list):
        out = sorted({int(x) for x in cop})
        if not out or any(x not in (1, 2, 3, 4) for x in out):
            raise InvalidCorrectOptionError(
                "For multi-select questions, cop must be a non-empty list of distinct options, each 1–4."
            )
        return out
    raise InvalidCorrectOptionError(
        "cop must be either a single integer (1–4) or a list of integers for multiple correct answers."
    )


def user_answer_selection(answer: ContestQuestionAttempt) -> list[int]:
    if answer.selected_options is not None:
        return sorted(
            {int(x) for x in answer.selected_options if 1 <= int(x) <= 4}
        )
    return []


def _points_per_question(marking_scheme: str) -> tuple[int, int, int]:
    """Per-question (correct, incorrect, skipped) marks for a fixed ``MarkingScheme`` value."""
    if marking_scheme == MarkingScheme.NEET_PG:
        return 4, -1, 0
    if marking_scheme in (MarkingScheme.USMLE, MarkingScheme.POSITIVE_ONLY):
        return 1, 0, 0
    raise ValueError(f"Unknown marking_scheme: {marking_scheme!r}")


def grade_attempt_against_keys(
    attempt: ContestAttempt,
    correct_options: dict[str, list[int]],
    marking_scheme: str,
) -> tuple[float, int, int, int]:
    """
    Return (total score, n_correct, n_incorrect, n_skipped) for ``contest.marking_scheme``.

    Every question id present in ``correct_options`` is graded once. If there is no saved
    ``ContestQuestionAttempt`` row (user never synced that question), it counts as **skipped**,
    not omitted—otherwise total marks would ignore unanswered items and scores would be too high.
    Rows for question ids not in ``correct_options`` are graded as incorrect if answered.
    """
    pc, pi, ps = _points_per_question(marking_scheme)
    answers = list(attempt.answers.all())
    by_qid = {str(a.question_id): a for a in answers}

    question_ids: set[str] = set(correct_options.keys())
    question_ids.update(
        str(a.question_id) for a in answers if str(a.question_id) not in correct_options
    )

    correct = 0
    incorrect = 0
    skipped = 0
    for qid in sorted(question_ids):
        expected = correct_options.get(qid)
        answer = by_qid.get(qid)
        user_sel = user_answer_selection(answer) if answer is not None else []

        if expected is None:
            if answer is None:
                continue
            if answer.is_skipped or not user_sel:
                skipped += 1
            else:
                incorrect += 1
            continue

        if answer is None:
            skipped += 1
        elif answer.is_skipped or not user_sel:
            skipped += 1
        elif user_sel == expected:
            correct += 1
        else:
            incorrect += 1

    score = correct * pc + incorrect * pi + skipped * ps
    return float(score), correct, incorrect, skipped


def score_attempt_against_keys(
    attempt: ContestAttempt,
    correct_options: dict[str, list[int]],
    marking_scheme: str,
) -> tuple[float, int]:
    """Return (total score, number of fully correct questions)."""
    score, correct, _incorrect, _skipped = grade_attempt_against_keys(
        attempt, correct_options, marking_scheme
    )
    return score, correct
