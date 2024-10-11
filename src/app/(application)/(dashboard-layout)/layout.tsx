import AppPageHeader from "@/components/headers/application-page-header";
import SideNavigationMenu from "@/components/side-navigation-menu";
import AuthGuard from "@/hoc/auth-guard";
import AuthProvider from "@/hoc/auth-provider";
import GaProvider from "@/hoc/ga.provider";
import { ReduxProvider } from "@/hoc/redux.provider";
import { ToastProvider } from "@/hoc/toast.hoc";
import { ILayoutProps } from "@/models/common";
import "@/styles/global.css";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body
        suppressHydrationWarning
        className="h-full text-sm"
      >
        <ReduxProvider>
          <AuthProvider>
            <AuthGuard>
              <ToastProvider>
                <div className="h-full flex">
                  <SideNavigationMenu />
                  <div className="flex-1 overflow-hidden">
                    <div
                      id="app-scrollable-view"
                      className="flex flex-col h-full overflow-y-auto"
                    >
                      <AppPageHeader />
                      <div>
                        <div className="max-w-screen-lg mx-auto p-4 px-6">{children}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ToastProvider>
            </AuthGuard>
          </AuthProvider>
        </ReduxProvider>
        <GaProvider />
      </body>
    </html>
  );
}
