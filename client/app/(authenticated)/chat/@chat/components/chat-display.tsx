import { Message } from 'ai'
import { MoreHorizontal } from 'lucide-react'
import { ChatMessage } from './chat-message'

export function ChatDisplay({ messages, isLoading }: { messages: Message[]; isLoading: Boolean }) {
  return (
    <div className="space-y-4 px-4 pb-48">
      {messages.map((message) => (
        <div className="border-b p-2" key={message.id}>
          <ChatMessage key={message.id} message={message} />
        </div>
      ))}
      {isLoading && messages[messages.length - 1].role === 'user' && <MoreHorizontal className="animate-pulse" />}
    </div>
  )
}
