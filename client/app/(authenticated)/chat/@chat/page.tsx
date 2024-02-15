'use client'

import { Message } from 'ai'
import { useChat } from 'ai/react'
import { ChatDisplay, ChatInput } from './components'
import { useChatStore } from './store'

export default function Chat({ initialMessages }: { initialMessages: Message[] }) {
  const { appendMessage } = useChatStore()

  const { messages, isLoading, input, handleInputChange, handleSubmit, stop, reload } = useChat({
    api: 'chat/api',
    initialMessages,
    async onFinish(message) {
      await appendMessage(input, 'user')
      await appendMessage(message.content, message.role)
    },
  })

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleSubmit(event)
  }

  const handleCancel = async () => {
    await appendMessage(messages[messages.length - 2].content, 'user')
    await appendMessage(messages[messages.length - 1].content, 'assistant')
    stop()
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <ChatDisplay messages={messages} isLoading={isLoading} />

      <ChatInput
        input={input}
        onInputChange={handleInputChange}
        handleSend={handleSend}
        handleCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
