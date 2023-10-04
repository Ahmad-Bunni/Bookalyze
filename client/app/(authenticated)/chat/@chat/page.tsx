'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import { ChatDisplay, ChatInput } from './components'

export default function Chat() {
  const { messages, isLoading, input, handleInputChange, handleSubmit } = useChat({ api: 'chat/api' })

  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <div className="bg-zinc-90 flex-1 overflow-y-auto rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800" ref={chatRef}>
        <ChatDisplay messages={messages} isLoading={isLoading} />
      </div>

      <div className="h-20 md:h-32">
        <ChatInput input={input} onInputChange={handleInputChange} handleSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </>
  )
}
