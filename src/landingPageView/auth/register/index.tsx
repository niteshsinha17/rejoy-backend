"use client";
import { AppRoutes, Routes } from "@/enum";
import { IErrorResponse } from "@/models";
import { ICreateUserServiceErrorResponse } from "@/models/auth";
import { authApi } from "@/services";
import { Button } from "@/ui";
import { formikFieldConfig, validatePassword, validateUsername } from "@/utils";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import EmailInput from "../components/emailInput";
import PasswordCheck from "../components/passwordChecks";
import PasswordInput from "../components/passwordInput";
import UsernameInput from "../components/usernameInput";
import EnterOptView from "./enter-otp";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").test("validate-password", "Password is not strong enough", validatePassword),
});

const RegisterView = () => {
  const [createUser, createUserState] = authApi.useCreateUserMutation();
  const [validateOTPStep, setValidateOTPStep] = useState(false);
  const form = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      createUser(values)
        .unwrap()
        .then(() => {
          setValidateOTPStep(true);
        })
        .catch((response: IErrorResponse<ICreateUserServiceErrorResponse>) => {
          const errors = {
            username: "",
            email: "",
            password: "",
          };
          if (response.errors.username) {
            errors.username = response.errors.username[0];
          }
          if (response.errors.email) {
            errors.email = response.errors.email[0];
          }
          if (response.errors.password) {
            errors.password = response.errors.password[0];
          }
          form.setErrors(errors);
        });
    },
  });
  const fieldConfig = formikFieldConfig(form);

  return (
    <div className="flex h-full justify-center p-4 items-center">
      <div className="w-full max-w-screen-sm p-6 border rounded-3xl shadow-sm">
      <form
            onSubmit={form.handleSubmit}
            className="space-y-5"
          >
        <div className="text-2xl font-semibold text-center">Create an account</div>
          <div className="space-y-3">
            <UsernameInput
              {...fieldConfig("username")}
              validateFn={(value) => {
                if (value === "") return true;
                return validateUsername(value);
              }}
            />
            <div>
              <div className="space-y-3">
                <EmailInput {...fieldConfig("email")} />
                <PasswordInput
                {...fieldConfig("password")}
                placeholder="Password"
                />
              </div>             
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
            <div>Password Checks:</div>
            <PasswordCheck password={form.values.password} />
            <Button
              fullWidth
              loading={createUserState.isLoading}
              type="submit"
            >
              Sign up
            </Button>
            <div className="text-sm text-center">
              By signing up, you agree to our{" "}
              <Link
                href={Routes.PRIVACY_POLICY}
                target="_blank"
                className="text-primary"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="text-sm text-center">
              <div className="text-base">Already have an account? </div>
              <Button
                href={AppRoutes.LOGIN}
                variant="text"
                size="sm"
              >
                Sign in
              </Button>
            </div>
          
          {validateOTPStep && (
            <EnterOptView
              email={form.values.email}
              onClose={() => setValidateOTPStep(false)}
              username={form.values.username}
              resendOtp={form.handleSubmit}
            />
          )}
        </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
