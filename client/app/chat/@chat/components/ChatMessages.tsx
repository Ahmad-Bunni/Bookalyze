import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Message, Role } from '../models'

export function ChatDisplay({ messages }: { messages: Message[] }) {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      className="m-auto mx-4 flex flex-col lg:mx-auto lg:max-w-3xl"
      ref={chatRef}
    >
      {messages.map((message, index) => (
        <div
          key={message.id || index}
          className={`border-b p-4 dark:border-zinc-600 
          ${
            index % 2 === 0
              ? 'bg-zinc-200 dark:bg-zinc-700'
              : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          {message.role === Role.USER ? (
            message.text
          ) : (
            <ReactMarkdown
              remarkPlugins={[gfm]}
              className="prose max-w-none dark:prose-invert"
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>
      ))}
    </div>
  )
}
