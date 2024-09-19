import { ROUTES } from "@/enum";
import useTimer from "@/hooks/useTimer";
import PasswordCheck from "@/landingPageView/auth/components/passwordChecks";
import { authApi } from "@/services";
import { Button, TextInput } from "@/ui";
import { Toast, formikFieldConfig, validatePassword } from "@/utils";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .test(
      "validate-password",
      "Password is not strong enough",
      validatePassword
    ),
  verificationCode: yup.string().required("Verification code is required"),
});

interface IGetEmailProps {
  email: string;
  handleBack: () => void;
}

const SetPassword = (props: IGetEmailProps) => {
  const [resetPassword, resetPasswordState] =
    authApi.useResetPasswordMutation();
  const [sendVerificationCode, sendVerificationCodeState] =
    authApi.useSendEmailVerificationOtpMutation();
  const router = useRouter();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      verificationCode: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      resetPassword({
        email: props.email,
        otp: values.verificationCode,
        password: values.password,
      })
        .unwrap()
        .then(() => {
          Toast.success("Password reset successfully!");
          router.push(ROUTES.LOGIN);
        })
        .catch((err) => {
          if (err.message) {
            Toast.error(err.message);
          }
        });
    },
  });
  const { timeLeft, formattedTime, start, restart } = useTimer({
    timeInSecond: 60,
    autoStart: true,
  });
  const resendOtp = () => {
    sendVerificationCode(props.email)
      .unwrap()
      .catch((err) => {
        if (err.message) {
          Toast.error(err.message);
        }
      });
  };
  const fieldConfig = formikFieldConfig(form);

  return (
    <div className="container">
      <div className="section">
        <h2 className="text-center">Reset Password</h2>
        <div className="max-w-2xl mx-auto mt-4">
          <form
            onSubmit={form.handleSubmit}
            className="shadow-md border rounded-2xl"
          >
            <div className="p-4 space-y-3">
              <div className="text-md font-medium font-manrope">
                Enter Verification Code sent to your email address{" "}
                <b>{props.email}</b> and set a new password.
              </div>
              <TextInput
                placeholder="Enter Verification Code"
                {...fieldConfig("verificationCode")}
              />
              <TextInput
                placeholder="Enter new password"
                {...fieldConfig("password")}
              />
              <PasswordCheck password={form.values.password} />
            </div>
            <div className="h-[28px] px-4">
              {timeLeft > 0 ? (
                <div className="text-sm">
                  Resend in <b>{formattedTime}</b>
                </div>
              ) : (
                <div className="flex text-sm items-center">
                  Didn&apos;t received OTP?{" "}
                  <Button
                    onClick={() => {
                      resendOtp();
                      restart();
                    }}
                    variant="text"
                    color="primary"
                    size="sm"
                  >
                    Resend
                  </Button>
                </div>
              )}
            </div>
            <div className="p-4 border-t space-y-3 border-borderPrimary">
              <Button
                loading={resetPasswordState.isLoading}
                variant="solid"
                type="submit"
                borderType="rounded"
                fullWidth
              >
                Set Password
              </Button>
              <Button
                variant="solid"
                color="black"
                borderType="rounded"
                fullWidth
                onClick={props.handleBack}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
