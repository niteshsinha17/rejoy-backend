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
          <div className="flex-1 overflow-auto bg-[rgb(242,244,246)]">{children}</div>
        </div>
      </body>
    </html>
  );
}
