import { ILayoutProps } from "@/models";
import { LandingPageHeader } from "./_components";
import Footer from "./_components/footer";
import "./global.css";

export const metadata = {
  title: "Physical Therapy: Anytime, Anywhere",
  description: "Physical Therapy: Anytime, Anywhere",
};

export default function RootLayout(props: ILayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LandingPageHeader />
        {props.children}
        <Footer />
      </body>
    </html>
  );
}
