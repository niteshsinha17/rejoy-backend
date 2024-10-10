import uuid

from django.forms import ValidationError

from authentication.exceptions import EmailAlreadyExistsException
from core.models import DoctorProfile, User
from core.user.exceptions import UsernameNotAvailable
from core.utils import get_phone_number_with_country_code
from core.validators import username_validator


class CreateUserService:
    def check_username_available(self, username):
        if User.objects.filter(username=username).exists():
            raise UsernameNotAvailable("Username is not available")
        try:
            username_validator(username)
        except ValidationError:
            raise UsernameNotAvailable("Username is not available")

    def create_user(
        self,
        email: str,
        first_name: str,
        last_name: str,
        password: str,
        is_doctor: bool,
    ):
        existing_user = User.objects.filter(email=email).first()
        email_already_in_use = existing_user and existing_user.is_email_verified

        if email_already_in_use:
            raise EmailAlreadyExistsException("Email already in use")
        if existing_user:
            return existing_user

        user = existing_user or User.objects.create_user(
            username=str(uuid.uuid4()),
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            is_doctor=is_doctor,
        )

        if is_doctor:
            DoctorProfile.objects.create(user=user)
        return user

    def active_user(self, user: User):
        user.is_active = True
        user.is_email_verified = True
        user.save()
        # Event Notification
        #         send_mail(
        #             "New User Registration",
        #             f"""Hi,
        # A new user got registered on Neurality. Find details below.
        # User Email : {user.email}
        # User Name : {user.get_full_name()}
        # Username : {username}

        # Thanks,
        # Neurality Dev
        # """,
        #             [NOTIFICATION_EMAIL],
        #         )
        return user

    def create_guest_user(
        self, first_name: str, last_name: str, email: str, phone_number: str
    ):
        phone_number = get_phone_number_with_country_code(phone_number)
        return User.objects.create(
            username=uuid.uuid4(),
            guest_user=True,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
        )


class AgentService:

    def __init__(self, username: str):
        self.user = User.objects.get(username=username)
        self.doctor_detail = DoctorProfile.objects.get(user=self.user)

    def get_response(self, message_history):
        pass
