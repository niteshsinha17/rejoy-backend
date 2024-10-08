"use client";
import { useRef, useState } from "react";

import GetEmail from "./components/get-email";
import SetPassword from "./components/set-password";
import { STEPS } from "./interface";
const DEFAULT_RESEND_TIME = 60;
const formatTime = (time: number) => `0${time}`.slice(-2);

export const validateOtp = (otp: string) => {
  if (otp.trim().length === 0) {
    return "OTP must not be empty!";
  } else if (otp.length !== 4) {
    return "OTP must be 6 characters long!";
  }
  return "";
};

const ForgetPasswordView = () => {
  const [step, setStep] = useState<STEPS>(STEPS.ENTER_EMAIL);
  const email = useRef<string>("");
  const [resendTimeLeft, setResendTimeLeft] = useState<number>(DEFAULT_RESEND_TIME);
  const resendTimer = useRef<NodeJS.Timeout | null>(null);

  if (step == STEPS.ENTER_EMAIL)
    return (
      <GetEmail
        handleNext={(emailValue) => {
          email.current = emailValue;
          setStep(STEPS.ENTER_OTP);
        }}
      />
    );

  if (step === STEPS.ENTER_OTP)
    return (
      <SetPassword
        email={email.current}
        handleBack={() => {
          setStep(STEPS.ENTER_EMAIL);
        }}
      />
    );
};
export default ForgetPasswordView;
