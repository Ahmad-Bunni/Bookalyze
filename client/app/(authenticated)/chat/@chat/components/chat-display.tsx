import { Container } from '@/components/ui/container'
import { Message } from 'ai'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ChatMessage } from './chat-message'

export function ChatDisplay({ messages, isLoading }: { messages: Message[]; isLoading: Boolean }) {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={chatRef} className="flex-1 overflow-auto">
      <Container>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        <div className="p-4">
          {isLoading && messages[messages.length - 1].role === 'user' && <MoreHorizontal className="animate-spin" />}
        </div>
      </Container>
    </div>
  )
}
