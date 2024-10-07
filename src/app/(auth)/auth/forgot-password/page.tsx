import { getPageMetaData } from "@/utils";
import ForgetPasswordView from "@/views/forgot-password";

export const metadata = getPageMetaData({
  title: "Forget Password - RejoyHealth",
  description: "Forgot Password - Reset Your Account Password",
  keywords: "password reset, forgot password, account recovery, RejoyHealth",
});

export default function FP() {
  return <ForgetPasswordView />;
}
