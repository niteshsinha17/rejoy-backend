import AuthProvider from "@/hoc/auth-provider";
import { ReduxProvider } from "@/hoc/redux.provider";
import { ToastProvider } from "@/hoc/toast.hoc";
import "@/styles/global.css";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className="h-full">
        <ReduxProvider>
          <AuthProvider>
            <ToastProvider>
              {/* <TextToSpeechProvider> */}
              {children}
              {/* </TextToSpeechProvider> */}
            </ToastProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
