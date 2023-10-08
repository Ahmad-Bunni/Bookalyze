'use client'

import LoadingSpinner from '@/app/common/Animiation/LoadingSpinner'
import { ArrowIcon } from '@/app/common/Icons'
import { useEffect, useRef } from 'react'

interface ChatInputProps {
  input: any
  handleSubmit: any
  onInputChange: any
  isLoading: boolean
}

export function ChatInput({ input, handleSubmit, onInputChange, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const adjustInputHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && input?.trim() && !isLoading) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  useEffect(() => {
    adjustInputHeight()
  }, [input])

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full">
      <div className="mx-6 flex flex-row gap-3 last:mb-4 md:mx-auto md:max-w-2xl md:last:mb-6 lg:max-w-4xl xl:max-w-6xl">
        <div className="shadow-xs relative flex w-full items-center rounded-xl border py-2 shadow dark:border-zinc-600 dark:bg-zinc-700 md:py-4 md:pl-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            placeholder="Send a message"
            className="max-h-40 w-full resize-none bg-transparent pl-3 pr-10 text-zinc-600 outline-none dark:border-zinc-600 dark:text-zinc-200"
            onChange={onInputChange}
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
