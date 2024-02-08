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
    <div ref={chatRef} className="flex h-[calc(100vh-100px)] flex-col overflow-auto">
      <ChatDisplay messages={messages} isLoading={isLoading} />

      <ChatInput input={input} onInputChange={handleInputChange} handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
