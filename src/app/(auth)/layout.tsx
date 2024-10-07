import AuthLayoutHeader from "@/components/headers/auth-page-header";
import AuthProvider from "@/hoc/auth-provider";
import { ReduxProvider } from "@/hoc/redux.provider";
import { ToastProvider } from "@/hoc/toast.hoc";
import { ILayoutProps } from "@/models/common";
import GaProvider from "@/provider/ga.provider";
import "@/styles/global.css";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body
        suppressHydrationWarning
        className="h-full"
      >
        <ReduxProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="min-h-full flex flex-col">
                <AuthLayoutHeader />
                <div className="flex-1 overflow-hidden">
                  <div className="py-6">{children}</div>
                </div>
              </div>
            </ToastProvider>
          </AuthProvider>
        </ReduxProvider>
        <GaProvider />
      </body>
    </html>
  );
}
