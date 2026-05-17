"use client";
import { IErrorResponse } from "@/models/common";
import { authApi } from "@/services/auth.service";
import { Button } from "@/ui";
import { PasswordInput, TextInput } from "@/ui/inputs";
import { formikFieldConfig, validatePassword } from "@/utils";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import EmailInput from "../../../ui/inputs/email-input";
import PasswordCheck from "../components/passwordChecks";
import BottomOptions from "./bottom-options";
import EnterOptModal from "./enter-otp";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .test("validate-password", "Password must be at least 4 characters", validatePassword),
});

const STEPS = {
  EMAIL: "EMAIL",
  OTP: "OTP",
};

const RegisterView = () => {
  const [createUser, createUserState] = authApi.useCreateDoctorUserMutation();
  const [currentStep, setCurrentStep] = useState(STEPS.EMAIL);

  const form = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      createUser(values)
        .unwrap()
        .then(() => {
          setCurrentStep(STEPS.OTP);
        })
        .catch((response: IErrorResponse<object>) => {
          form.setErrors(response.errors);
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
          <div className="text-2xl font-semibold text-center text-slate-900">Provider Sign up</div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                {...fieldConfig("first_name")}
                autoFocus
                placeholder="First Name*"
              />
              <TextInput
                {...fieldConfig("last_name")}
                placeholder="Last Name"
              />
            </div>
            <div>
              <div className="space-y-3">
                <EmailInput {...fieldConfig("email")} />
                <PasswordInput {...fieldConfig("password")} />
              </div>
              <div className="flex items-center justify-end">
                {/* <Button
                  href={AppRoutes.FORGOT_PASSWORD}
                  variant="text"
                  color="danger"
                  size="sm"
                >
                  Forgot Password?
                </Button> */}
              </div>
            </div>
            <div>
              <div className="text-sm mb-1 text-slate-900 font-medium">Password Checks:</div>
              <PasswordCheck password={form.values.password} />
            </div>
            <Button
              fullWidth
              loading={createUserState.isLoading}
              type="submit"
            >
              Sign up
            </Button>
            <BottomOptions />
          </div>
        </form>
      </div>

      {currentStep === STEPS.OTP && (
        <EnterOptModal
          email={form.values.email}
          onClose={() => setCurrentStep(STEPS.EMAIL)}
          resendOtp={form.handleSubmit}
        />
      )}
    </div>
  );
};

export default RegisterView;
