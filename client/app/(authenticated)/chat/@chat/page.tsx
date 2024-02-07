'use client'

import { useChat } from 'ai/react'
import { ChatDisplay, ChatInput } from './components'

export default function Chat() {
  const { messages, isLoading, input, handleInputChange, handleSubmit } = useChat({ api: 'chat/api' })

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col justify-between">
      <ChatDisplay messages={messages} isLoading={isLoading} />

      <ChatInput input={input} onInputChange={handleInputChange} handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
