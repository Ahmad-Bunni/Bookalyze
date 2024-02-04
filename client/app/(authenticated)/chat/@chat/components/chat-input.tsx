'use client'

import { ArrowIcon } from '@/app/common/Icons'
import { useEffect, useRef } from 'react'

interface ChatInputProps {
  input: any
  handleSubmit: any
  onInputChange: any
  isLoading: boolean
}

export function ChatInput({ input, handleSubmit, onInputChange, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    <div className="relative flex w-full flex-col items-center rounded-xl border py-4 shadow">
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        placeholder="Send a message"
        className="max-h-40 w-full resize-none bg-transparent pl-3 pr-10 outline-none "
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
      />

      <button className={`absolute bottom-1 right-2 p-2  ${isLoading ? '' : 'bottom-3'}`}>
        {isLoading ? '?' : <ArrowIcon />}
      </button>
    </div>
  )
}
