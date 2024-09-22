import { ReduxProvider } from "@/hoc";
import { ToastProvider } from "@/hoc/toast.hoc";
import { ILayoutProps } from "@/models";
import GaProvider from "@/provider/ga.provider";
import "@/styles/global.css";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html lang="en">
      <GaProvider />
      <body>
        <ReduxProvider>
          <ToastProvider>
            <div className="h-[70px] flex justify-center items-center">Header will be replaced</div>
            <div className="min-h-screen">{children}</div>
            {/* <LandingPageFooter /> */}
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
