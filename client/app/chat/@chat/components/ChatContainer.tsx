'use client'

import { useEffect, useRef } from 'react'
import { ChatDisplay, ChatInput } from '.'

import { useChat } from 'ai/react'

export default function ChatContainer() {
  const { messages, isLoading, input, handleInputChange, handleSubmit } = useChat({ api: 'chat/api' })

  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <div className="flex-1 overflow-y-auto" ref={chatRef}>
        <ChatDisplay messages={messages} />
      </div>

      <div className="h-20 md:h-32">
        <ChatInput input={input} onInputChange={handleInputChange} handleSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </>
  )
}
