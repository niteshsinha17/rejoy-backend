"use client";

import { IErrorResponse } from "@/models/common-service.interface";
import { authApi } from "@/services";
import { Button, TextInput } from "@/ui";
import { Toast, formikFieldConfig } from "@/utils";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

interface IGetEmailProps {
  handleNext: (email: string) => void;
}
const GetEmail = (props: IGetEmailProps) => {
  const [sendVerificationCode, sendVerificationCodeState] =
    authApi.useSendEmailVerificationOtpMutation();
  const form = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      sendVerificationCode(values.email)
        .unwrap()
        .then(() => {
          Toast.success("Verification code sent successfully!");
          props.handleNext(values.email);
        })
        .catch((err: IErrorResponse) => {
          if (err.message) {
            Toast.error(err.message);
          }
        });
    },
  });

  const fieldConfig = formikFieldConfig(form);

  return (
    <div className="container">
      <div className="section">
        <h2 className="text-center">Forgot Password</h2>
        <div className="max-w-2xl mx-auto mt-4">
          <form
            onSubmit={form.handleSubmit}
            className="shadow-md border rounded-2xl"
          >
            <div className="p-4 space-y-3">
              <div className="text-md font-medium font-manrope">
                Enter your email address to get a verification code on your
                email to reset your password.
              </div>
              <TextInput
                placeholder="Enter your email address"
                {...fieldConfig("email")}
              />
            </div>

            <div className="p-4 border-t border-borderPrimary">
              <>
                <Button
                  loading={sendVerificationCodeState.isLoading}
                  variant="solid"
                  type="submit"
                  borderType="rounded"
                  fullWidth
                >
                  Get Verification Code
                </Button>
              </>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetEmail;
