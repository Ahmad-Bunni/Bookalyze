'use client'

import { ArrowIcon } from '@/app/common/Icons/Arrow'
import LoadingSpinner from '@/app/common/Icons/LoadingSpinner'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Message, Role } from '../models'

interface ChatInputProps {
  onSendMessage: (message: Message) => void
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState<string>()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const adjustInputHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustInputHeight()
  }, [inputValue])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      inputValue?.trim() &&
      !isLoading
    ) {
      event.preventDefault()

      const message: Message = {
        id: uuidv4(),
        role: Role.USER,
        text: inputValue.trim(),
      }

      onSendMessage(message)
      setInputValue('')
    }
  }

  return (
    <div className="absolute bottom-0 w-full">
      <div className="mx-4 flex flex-row gap-3 last:mb-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
        <div className="shadow-xs relative flex w-full items-center rounded-xl border py-2 shadow dark:border-zinc-600 dark:bg-zinc-700 md:py-4 md:pl-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputValue}
            placeholder="Send a message"
            className="max-h-40 w-full resize-none bg-transparent pl-3 pr-10 text-zinc-600 outline-none dark:border-zinc-600 dark:text-zinc-200"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className={`absolute bottom-1 right-2 p-1 text-zinc-400 dark:text-zinc-200 md:p-2 ${
              isLoading ? '' : 'md:bottom-3'
            }`}
          >
            {isLoading ? <LoadingSpinner /> : <ArrowIcon />}
          </button>
        </div>
      </div>
    </div>
  )
}
