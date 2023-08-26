'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ChatDisplay, ChatInput } from '.'
import { sendMessage } from '../api/chat.actions'
import { Message, Role } from '../models'

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const sendCurrentMessage = async (currentMessage: Message) => {
    try {
      const response = await sendMessage(currentMessage.text)

      const message: Message = {
        id: uuidv4(),
        text: response,
        role: Role.SYSTEM,
      }

      setMessages((prevMessages) => [...prevMessages, message])
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
      setCurrentMessage(null)
    }
  }

  useEffect(() => {
    if (currentMessage) {
      sendCurrentMessage(currentMessage)
    }
  }, [currentMessage])

  const handleSendMessage = (message: Message) => {
    setIsLoading(true)
    setMessages((prevMessages) => [...prevMessages, message])
    setCurrentMessage(message)
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <ChatDisplay messages={messages} />
      </div>

      <div className="h-20 md:h-32">
        <ChatInput isLoading={isLoading} onSendMessage={handleSendMessage} />
      </div>
    </>
  )
}
