'use client'

import { NextAuthProvider } from '@/app/auth-provider'
import { useChat } from 'ai/react'
import { AuthenticatedNavbar } from '../../auth-navbar'
import { ChatDisplay, ChatInput } from './components'
import { db } from './db/db-model'
export default function Chat() {
  const { messages, isLoading, input, handleInputChange, handleSubmit } = useChat({
    api: 'chat/api',
    onFinish(message) {
      db.messages.add(message)
    },
  })

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event)
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <NextAuthProvider>
        <AuthenticatedNavbar />
      </NextAuthProvider>

      <ChatDisplay messages={messages} isLoading={isLoading} />

      <ChatInput input={input} onInputChange={handleInputChange} handleSubmit={handleSend} isLoading={isLoading} />
    </div>
  )
}
