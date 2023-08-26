import Chat from './@chat/page'
import { ChatHeader } from './components/ChatHeader'

export default function Layout() {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />

      <Chat />
    </div>
  )
}
