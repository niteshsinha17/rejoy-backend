"""Contest domain services; use `ContestService` from `contest.services`."""

from contest.services.answer_key import (
    generate_results,
    upload_answer_key_file,
    upload_answer_key_json,
)
from contest.services.attempts import save_answer, start_attempt, submit_attempt
from contest.services.catalog import get_detail, get_past, get_upcoming_or_live
from contest.services.leaderboard import (
    get_leaderboard,
    get_leaderboard_cached,
    get_leaderboard_me_for_user,
)
from contest.services.questions import get_practice_payload
from contest.services.reminders import register_reminder
from contest.services.results import get_result
from contest.services.scoring import (
    grade_attempt_against_keys,
    normalize_cop,
    score_attempt_against_keys,
    user_answer_selection,
)

__all__ = [
    "ContestService",
    "grade_attempt_against_keys",
    "normalize_cop",
    "score_attempt_against_keys",
    "user_answer_selection",
]


class ContestService:
    get_practice_payload = staticmethod(get_practice_payload)
    get_upcoming_or_live = staticmethod(get_upcoming_or_live)
    get_past = staticmethod(get_past)
    get_detail = staticmethod(get_detail)
    start_attempt = staticmethod(start_attempt)
    save_answer = staticmethod(save_answer)
    submit_attempt = staticmethod(submit_attempt)
    generate_results = staticmethod(generate_results)
    upload_answer_key_json = staticmethod(upload_answer_key_json)
    upload_answer_key_file = staticmethod(upload_answer_key_file)
    get_leaderboard_cached = staticmethod(get_leaderboard_cached)
    get_result = staticmethod(get_result)
    get_leaderboard = staticmethod(get_leaderboard)
    get_leaderboard_me_for_user = staticmethod(get_leaderboard_me_for_user)
    grade_attempt_against_keys = staticmethod(grade_attempt_against_keys)
    register_reminder = staticmethod(register_reminder)
