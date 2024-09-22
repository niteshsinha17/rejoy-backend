"use client";
import { AppRoutes } from "@/enum";
import { useAuth } from "@/provider";
import { loginWithCredentialsService } from "@/services";
import { Button } from "@/ui";
import { formikFieldConfig } from "@/utils";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import PasswordInput from "../components/passwordInput";
import UsernameInput from "../components/usernameInput";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginView = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      loginWithCredentialsService(values.username, values.password)
        .onSuccess(async (data) => {
          login(data.token);
        })
        .onError((error) => {
          const errors = error.errors;
          if (errors) {
            form.setErrors({
              username: errors.username ? errors.username[0] : "",
              password: errors.password ? errors.password[0] : "",
            });
          } else {
            toast.error(error.message);
          }
          setLoading(false);
        })
        .execute();
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
          <div className="text-2xl font-semibold text-center">Login</div>
          <div className="space-y-3">
            <UsernameInput
              placeholder="Username or Email"
              {...fieldConfig("username")}
            />
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
              loading={loading}
              fullWidth
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
