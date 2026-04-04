from common.exceptions import BaseValidationError


class ContestValidationError(BaseValidationError):
    """Base for contest domain errors; override ``default_message`` on subclasses."""

    default_message = "Something went wrong with this contest. Please try again."


class ContestJsonValidationError(ContestValidationError):
    default_message = (
        "Contest JSON does not match the expected shape. "
        "Check the question bank export or answer-key format."
    )

    def __init__(self, message: str | None = None, *, code: str | None = None):
        text = message if message is not None else self.default_message
        if code is not None:
            super().__init__(text, code=code)
        else:
            super().__init__(text)


class ContestNotLiveError(ContestValidationError):
    default_message = (
        "This contest is not open for that action right now. "
        "It may not have started yet, may already be over, or may be outside the live window."
    )


class NotRegisteredError(ContestValidationError):
    default_message = (
        "We could not find a contest attempt for your account. "
        "Open the contest and start it before doing this."
    )


class AlreadySubmittedError(ContestValidationError):
    default_message = (
        "You have already submitted this contest attempt. "
        "Answers can no longer be changed."
    )


class AttemptExpiredError(ContestValidationError):
    default_message = (
        "Time for this contest attempt has run out. "
        "Any saved answers were kept and the attempt is now closed."
    )


class InvalidQuestionOrderError(ContestValidationError):
    default_message = "The question order in the request is not valid for this contest."


class ResultsNotReleasedError(ContestValidationError):
    default_message = (
        "Your personal results are not available yet. "
        "They appear after the contest ends and the answer key is available."
    )


class PracticeNotAvailableError(ContestValidationError):
    default_message = (
        "Practice mode is only available after the contest has fully ended. "
        "Try again once the scheduled contest window is over."
    )


class ContestQuestionsNotLoadedError(ContestValidationError):
    default_message = (
        "This contest has no questions loaded yet. "
        "Questions must be synced from the question bank before you can continue."
    )


class InvalidCorrectOptionError(ContestValidationError):
    default_message = (
        "Each row in the answer key must include a valid correct option (cop): "
        "a single choice 1–4, or a non-empty list of choices from 1–4."
    )


class AnswerKeyIncompleteError(ContestValidationError):
    default_message = (
        "The answer key does not cover every question in this contest. "
        "Add an entry for each question before generating results."
    )


class AnswerKeyUploadError(ContestValidationError):
    default_message = (
        "The answer key file or payload could not be processed. "
        "Use valid JSON in the expected format."
    )


class UnknownContestQuestionError(ContestValidationError):
    default_message = (
        "That question id does not belong to this contest. "
        "Use the ids from the question list returned when you started the attempt."
    )


class MultipleSelectionsNotAllowedError(ContestValidationError):
    default_message = (
        "This question is single-select: send at most one value in selected_options, "
        "or set is_skipped to true."
    )
