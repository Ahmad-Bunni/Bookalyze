'use client'

import { ChevronRight, Loader2 } from 'lucide-react'
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
    <div className="fixed bottom-0 left-0 h-36 w-full bg-background">
      <div className="absolute bottom-12 left-0 right-0 mx-auto flex w-full max-w-5xl flex-row items-center rounded-xl border p-4 shadow">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          placeholder="Send a message"
          className="max-h-40 w-full resize-none bg-transparent pr-10 outline-none "
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="absolute bottom-1 right-2 p-2">
          {isLoading ? (
            <Loader2 size={32} className="animate-spin" />
          ) : (
            <ChevronRight size={32} onClick={handleSubmit} />
          )}
        </button>
      </div>
    </div>
  )
}
