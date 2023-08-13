import Chat from './@chat/page'
import { ChatHeader } from './components/ChatHeader'

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />

      <div className="flex-1 relative overflow-hidden">
        <Chat />
      </div>
    </div>
  )
}
