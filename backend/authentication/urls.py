from django.urls import path

from authentication.apis import (
    AuthActivateUserApi,
    AuthCreateDoctorUserApi,
    AuthLoginView,
    AuthSendPhoneVerificationOTP,
    AuthVerifyPhoneOTP,
    AuthVerifyView,
    ResetPassword,
    SendEmailVerificationCode,
)

urlpatterns = [
    path("check-auth/", AuthVerifyView.as_view(), name="check-auth"),
    path("create-doctor-user/", AuthCreateDoctorUserApi.as_view(), name="create-user"),
    path("activate-user/", AuthActivateUserApi.as_view(), name="activate-user"),
    path("login/", AuthLoginView.as_view(), name="login"),
    path(
        "send-phone-verification-otp/",
        AuthSendPhoneVerificationOTP.as_view(),
        name="send-phone-verification-otp",
    ),
    path("verify-phone-otp/", AuthVerifyPhoneOTP.as_view(), name="verify-phone"),
    path(
        "send-email-verification-code/",
        SendEmailVerificationCode.as_view(),
        name="send-email-verification-code",
    ),
    path(
        "reset-password/",
        ResetPassword.as_view(),
        name="reset-password",
    ),
]
