import { ReduxProvider } from "@/hoc"
import { ToastProvider } from "@/hoc/toast.hoc"
import { TextToSpeechProvider } from "@/view/chat-view/context/speek-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ToastProvider>
            <TextToSpeechProvider>
              <div className="flex h-full">
                <div className="flex-1 overflow-hidden">{children}</div>
              </div>
            </TextToSpeechProvider>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
