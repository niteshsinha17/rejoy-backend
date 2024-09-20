//import { ReduxProvider } from "@/hoc";
import ForgetPasswordView from "@/landingPageView/forgot-password";
import { getPageMetaData } from "@/utils";

export const metadata = getPageMetaData({
  title: "Forget Password - Neurality",
  description: "Forgot Password - Reset Your Account Password",
  keywords: "password reset, forgot password, account recovery, Neurality",
});

export default function FP() {
  return (
    //<ReduxProvider>
      <ForgetPasswordView />
   // </ReduxProvider>
  );
}