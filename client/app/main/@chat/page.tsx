'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([
    'Hello! How may I help you today?',
  ])

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLDivElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      if (inputValue.trim()) {
        setMessages((prevMessages) => [...prevMessages, inputValue.trim()])
        setInputValue('')
      }

      if (inputRef.current) {
        inputRef.current.innerText = ''
      }
    }
  }

  const handleInput = () => {
    if (inputRef.current) {
      setInputValue(inputRef.current.innerText)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  const clearChat = () => {
    setMessages([])
    inputRef.current?.focus()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-inherit dark:border-zinc-600 dark:text-white">
      <div className="flex max-md:gap-8 mx-auto pb-4 pt-2">
        <button className="md:px-4" onClick={clearChat}>
          New Chat
        </button>

        <Link className="md:px-4" href="#upload">
          Upload Document
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`break-words border-b p-4 border-zinc-300 dark:border-zinc-600 max-w-6xl mx-auto ${
              index % 2 === 0
                ? 'dark:bg-zinc-700 bg-zinc-200'
                : 'dark:bg-zinc-800 bg-zinc-100'
            } `}
          >
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex items-center gap-4 w-full max-w-lg mx-auto pb-16 pt-8">
        <div
          role="textbox"
          className="p-2 break-words outline-none rounded-xl border w-full text-zinc-600 dark:border-zinc-600 dark:text-zinc-200 shadow break-word"
          ref={inputRef}
          contentEditable
          aria-multiline={true}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        ></div>

        <button onClick={scrollToBottom}>Scroll</button>
      </div>
    </div>
  )
}
