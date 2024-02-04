import { Message } from 'ai'
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
    <div ref={chatRef} className="flex flex-1 flex-col gap-1 overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id}>
          <ChatMessage key={message.id} message={message} />
        </div>
      ))}

      {isLoading && messages[messages.length - 1].role === 'user' && <div>loading ...</div>}
    </div>
  )
}
