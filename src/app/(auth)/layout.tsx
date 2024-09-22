import { ReduxProvider } from "@/hoc";
import AuthGuard from "@/hoc/authGuard.hoc";
import { ILayoutProps } from "@/models";
import GaProvider from "@/provider/ga.provider";
import "@/styles/global.css";
import { ToastProvider } from "@/hoc/toast.hoc";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html className="h-full" lang="en">
      <GaProvider/>
      <body className=" landing-page-typography h-full" suppressHydrationWarning={true}>
        <ReduxProvider>
          <AuthGuard noRedirect={true} mountChild={true}>
            <ToastProvider>
              <div>
                Header
              </div>
              <div>
                <div className="flex-1 overflow-auto ">{children}</div>
              </div>
            </ToastProvider>
        </AuthGuard>
        </ReduxProvider>
      </body>
    </html>
  );
}