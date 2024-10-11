import LandingPageHeader from "@/components/headers/landing-page-header";
import AuthProvider from "@/hoc/auth-provider";
import GaProvider from "@/hoc/ga.provider";
import { ReduxProvider } from "@/hoc/redux.provider";
import { ILayoutProps } from "@/models/common";
import "@/styles/global.css";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <LandingPageHeader />
            {children}
            <GaProvider />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
