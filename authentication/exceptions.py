from core.exceptions import BaseValidationError


class OtpExpiredException(BaseValidationError):
    message = "OTP Expired"


class InvalidOtpException(BaseValidationError):
    message = "Invalid OTP"


class InvalidTokenException(BaseValidationError):
    message = "Invalid Token"


class InvalidPasswordException(BaseValidationError):
    message = "Invalid Password"


class InvalidUserNameException(BaseValidationError):
    message = "Username already exists"


class EmailAlreadyExistsException(BaseValidationError):
    message = "Email already exists"


class EmailAndUsernameAlreadyExistsException(BaseValidationError):
    message = "Email and Username already exists"
