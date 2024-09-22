import ForgetPasswordView from "@/landingPageView/forgot-password";
import { getPageMetaData } from "@/utils";

export const metadata = getPageMetaData({
  title: "Forget Password - RejoyHealth",
  description: "Forgot Password - Reset Your Account Password",
  keywords: "password reset, forgot password, account recovery, RejoyHealth",
});

export default function FP() {
  return (
      <ForgetPasswordView />
  );
}