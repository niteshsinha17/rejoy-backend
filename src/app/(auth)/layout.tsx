import { ReduxProvider } from "@/hoc";
import { ToastProvider } from "@/hoc/toast.hoc";
import { ILayoutProps } from "@/models";
import GaProvider from "@/provider/ga.provider";
import "@/styles/global.css";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html
      className="h-full"
      lang="en"
    >
      <GaProvider />
      <body
        className=" landing-page-typography h-full"
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
          <ToastProvider>
            <div>Header</div>
            <div>
              <div className="flex-1 overflow-auto ">{children}</div>
            </div>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
