import { ILayoutProps } from "@/models";
import GaProvider from "@/provider/ga.provider";
import { LandingPageHeader } from "./_components";
import Footer from "./_components/footer";
import "./global.css";

export const metadata = {
  title: "Physical Therapy: Anytime, Anywhere",
  description: "Physical Therapy: Anytime, Anywhere",
};

export default function RootLayout(props: ILayoutProps) {
  return (
    <html lang="en" className="text-sm sm:text-lg">
      <body suppressHydrationWarning={true}>
        <GaProvider></GaProvider>

        <LandingPageHeader />
        {props.children}
        <Footer />
      </body>
    </html>
  );
}
