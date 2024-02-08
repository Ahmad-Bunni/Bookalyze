import { Message } from 'ai'
import { Bot } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export const ChatMessage = React.memo(({ message }: { message: Message }) => {
  return (
    <>
      {message.role === 'user' ? (
        <div className="flex flex-col">
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <Bot size={26} />

          <ReactMarkdown
            remarkPlugins={[gfm]}
            className="prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden max-w-none"
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
    </>
  )
})

ChatMessage.displayName = 'MessageComponent'
