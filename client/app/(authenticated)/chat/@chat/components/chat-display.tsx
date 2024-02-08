import { Container } from '@/components/ui/container'
import { Message } from 'ai'
import { MoreHorizontal } from 'lucide-react'
import { ChatMessage } from './chat-message'

export function ChatDisplay({ messages, isLoading }: { messages: Message[]; isLoading: Boolean }) {
  return (
    <div className="pb-36">
      {messages.map((message) => (
        <div className="border-b p-4" key={message.id}>
          <Container>
            <ChatMessage key={message.id} message={message} />
          </Container>
        </div>
      ))}

      <Container>
        <div className="pt-4">
          {isLoading && messages[messages.length - 1].role === 'user' && <MoreHorizontal className="animate-pulse" />}
        </div>
      </Container>
    </div>
  )
}
