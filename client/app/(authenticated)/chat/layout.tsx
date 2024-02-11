import { ChatLeftbar } from './@chat/components/chat-leftbar'
import { ChatLeftToggle } from './@chat/components/chat-leftbar-toggle'
import { SidebarProvider } from './@chat/context/sidebar-context'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <ChatLeftbar />
        <ChatLeftToggle />
      </SidebarProvider>

      {children}
    </div>
  )
}
