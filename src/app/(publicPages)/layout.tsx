import AuthProvider from "@/hoc/auth-provider";
import { ReduxProvider } from "@/hoc/redux.provider";
import { ILayoutProps } from "@/models/common";
import GaProvider from "@/provider/ga.provider";
import "@/styles/global.css";
import { LandingPageHeader } from "../(landingPages)/_components";

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
