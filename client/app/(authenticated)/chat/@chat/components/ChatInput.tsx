'use client'

import LoadingSpinner from '@/app/common/Animiation/LoadingSpinner'
import { ArrowIcon } from '@/app/common/Icons'
import { Container } from '@/app/common/layout/Container'
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
    <div className="h-32">
      <div className="absolute bottom-0 left-0 right-0  mx-auto flex last:mb-4">
        <Container>
          <div className="relative mx-auto  flex w-full flex-col items-center rounded-xl border py-4 shadow dark:border-zinc-600 dark:bg-zinc-700">
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
              className={`absolute bottom-1 right-2 p-2 text-zinc-400 dark:text-zinc-200 ${
                isLoading ? '' : 'bottom-3'
              }`}
            >
              {isLoading ? <LoadingSpinner /> : <ArrowIcon />}
            </button>
          </div>
        </Container>
      </div>
    </div>
  )
}
