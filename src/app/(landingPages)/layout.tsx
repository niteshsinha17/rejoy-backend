import { ILayoutProps } from "@/models";
import GaProvider from "@/provider/ga.provider";
import { LandingPageHeader } from "./_components";
import Footer from "./_components/footer";
import "./global.css";

export const metadata = {
  title: "Back and Joint Pain Care with Artificial Intelligence",
  description: "Back and Joint Pain Care with Artificial Intelligence",
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
