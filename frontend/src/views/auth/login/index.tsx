"use client";
import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { authApi } from "@/services/auth.service";
import { Button } from "@/ui";
import { EmailInput, PasswordInput } from "@/ui/inputs";
import { Toast, formikFieldConfig } from "@/utils";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginView = () => {
  const { login } = useAuth();
  const [loginWithCredentials, loginWithCredentialsState] = authApi.useLoginWithCredentialsMutation();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginWithCredentials(values)
        .unwrap()
        .then((response) => {
          login(response.token);
        })
        .catch((error) => {
          const errors = error.errors;
          if (errors) {
            form.setErrors(errors);
          } else {
            Toast.error(error.message);
          }
        });
    },
    validationSchema,
  });

  const fieldConfig = formikFieldConfig(form);

  return (
    <div className="flex h-full justify-center p-4 items-center">
      <div className="w-full max-w-screen-sm p-6 border rounded-3xl shadow-sm">
        <form
          onSubmit={form.handleSubmit}
          className="space-y-5"
        >
          <div className="text-2xl font-semibold text-center">Provider Login</div>
          <div className="space-y-3">
            <EmailInput {...fieldConfig("email")} />
            <div>
              <PasswordInput
                placeholder="Password"
                {...fieldConfig("password")}
              />
              <div className="flex items-center justify-end">
                <Button
                  href={AppRoutes.FORGOT_PASSWORD}
                  variant="text"
                  color="danger"
                  size="sm"
                >
                  Forgot Password?
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Button
              type="submit"
              loading={loginWithCredentialsState.isLoading}
              fullWidth
              disabled={loginWithCredentialsState.isSuccess}
            >
              Sign in
            </Button>
            <div className="text-sm text-center">
              <div>Don&apos;t have an account? </div>
              <Button
                href={AppRoutes.REGISTER}
                variant="text"
                size="sm"
              >
                Sign up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
