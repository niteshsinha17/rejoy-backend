"use client";
import { ROUTES } from "@/enum";
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
    <div className="bg-accent flex h-full justify-center p-3 items-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-md w-full max-w-screen-sm p-6">
        <div className="text-2xl font-semibold">Log in to your account</div>
        <div className="max-w-none">
          <form
            onSubmit={form.handleSubmit}
            className=" mx-auto mt-4 space-y-3"
          >
            <UsernameInput
              placeholder="Username or Email"
              {...fieldConfig("username")}
            />
            <PasswordInput
              placeholder="Password"
              {...fieldConfig("password")}
            />
            <div className="flex items-center justify-end">
              <Button
                href={ROUTES.DASHBOARD}
                variant="text"
                color="danger"
              >
                Forgot Password?
              </Button>
            </div>
            <Button
              type="submit"
              loading={loading}
              fullWidth
            >
              Sign in
            </Button>
            <div className="flex items-center">
              <div className="text-base">Don&apos;t have an account? </div>
              <Button
                href={ROUTES.REGISTER}
                variant="text"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
