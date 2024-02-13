'use client'

import { useChat } from 'ai/react'
import { useEffect } from 'react'
import { ChatDisplay, ChatInput } from './components'
import { useChatStore } from './store'

export default function Chat() {
  const { selectedConversation, messages, appendMessage } = useChatStore()

  const {
    messages: messagesStream,
    isLoading,
    input,
    setMessages,
    handleInputChange,
    handleSubmit,
  } = useChat({
    api: 'chat/api',
    async onFinish(message) {
      await appendMessage(message.content, message.role)
    },
  })

  useEffect(() => {
    setMessages(messages)
  }, [selectedConversation])

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await appendMessage(input, 'user')

    handleSubmit(event)
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <ChatDisplay messages={messagesStream} isLoading={isLoading} />

      <ChatInput input={input} onInputChange={handleInputChange} handleSubmit={handleSend} isLoading={isLoading} />
    </div>
  )
}
