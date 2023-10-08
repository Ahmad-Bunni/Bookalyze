import { Container } from '@/app/common/layout/Container'
import { Message } from 'ai'
import { useEffect, useRef } from 'react'
import LoadingDots from './LoadingDots'
import { MessageComponent } from './MessageComponent'

export function ChatDisplay({ messages, isLoading }: { messages: Message[]; isLoading: Boolean }) {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={chatRef} className="bg-zinc-90 flex flex-1 flex-col gap-1 overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id} className={`${message.role === 'assistant' ? 'bg-zinc-300 dark:bg-zinc-700' : ''}`}>
          <MessageComponent key={message.id} message={message} />
        </div>
      ))}

      {isLoading && messages[messages.length - 1].role === 'user' && (
        <div className="bg-zinc-300 dark:bg-zinc-700">
          <Container>
            <LoadingDots />
          </Container>
        </div>
      )}
    </div>
  )
}
