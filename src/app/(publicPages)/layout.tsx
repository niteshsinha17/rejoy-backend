import { ILayoutProps } from "@/models/common";
import "@/styles/global.css";

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html
      className="h-full"
      lang="en"
    >
      <body className="h-full">
        <div className="h-full flex flex-col">
          <div className="h-10">Header</div>
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
