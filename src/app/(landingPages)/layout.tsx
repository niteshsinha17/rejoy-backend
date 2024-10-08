import { ILayoutProps } from "@/models/common";
import GaProvider from "@/provider/ga.provider";
import "@/styles/global.css";
import Footer from "../../components/footer";
import { LandingPageHeader } from "./_components";

export const metadata = {
  title: "Access expert healthcare information 24x7 at your fingertips",
  description: "Access expert healthcare information 24x7 at your fingertips",
};

export default function RootLayout(props: ILayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <LandingPageHeader />
        {props.children}
        <Footer />
        <GaProvider />
      </body>
    </html>
  );
}
