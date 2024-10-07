import { ILayoutProps } from "@/models/common";
import "./global.css";

export const metadata = {
  title: "Access expert healthcare information 24x7 at your fingertips",
  description: "Access expert healthcare information 24x7 at your fingertips",
};

export default function RootLayout(props: ILayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {props.children}
        {/* <GaProvider /> */}
        {/* <LandingPageHeader /> */}
        {/* {props.children} */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
