import { ConversationsBar } from './@chat/components/conversation-bar'
import { ConversationBarToggle } from './@chat/components/conversation-bar-toggle'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ConversationsBar />
      <ConversationBarToggle />

      {children}
    </div>
  )
}
