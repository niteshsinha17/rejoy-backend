import { ILayoutProps } from "@/models/common";
import "@/styles/global.css";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
