'use client'

import { Container } from '@/components/ui/container'
import { ArrowUp, Loader2Icon, Square } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ChatInputProps {
  input: string
  handleSend: (event: any) => void
  handleCancel: () => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export function ChatInput({ input, handleSend: handleSubmit, handleCancel, onInputChange, isLoading }: ChatInputProps) {
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
    <Container>
      <div className="relative mb-8 flex w-full flex-col overflow-hidden rounded-2xl border shadow">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          placeholder="Send a message"
          className="resize-none bg-transparent py-4 pl-4 pr-16"
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="absolute bottom-3 right-4">
          {isLoading ? (
            <div className="flex gap-2">
              <Loader2Icon size={32} className="animate-spin" />
              <Square onClick={handleCancel} size={32} className="animate-pulse" />
            </div>
          ) : (
            <div className="flex gap-2">
              <ArrowUp className="rounded-lg border p-1" size={32} onClick={handleSubmit} />
            </div>
          )}
        </button>
      </div>
    </Container>
  )
}
