import { ConversationBarToggle, ConversationsBar } from './@chat/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ConversationsBar />
      <ConversationBarToggle />

      {children}
    </div>
  )
}
