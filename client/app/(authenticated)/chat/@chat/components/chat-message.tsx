import { Message } from 'ai'
import { Bot } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export const ChatMessage = React.memo(({ message }: { message: Message }) => {
  return (
    <div className="p-4">
      {message.role === 'user' ? (
        <div className="flex flex-col">
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <Bot size={26} />

          <ReactMarkdown
            remarkPlugins={[gfm]}
            className="prose max-w-none dark:prose-invert prose-code:before:hidden prose-code:after:hidden"
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
})

ChatMessage.displayName = 'MessageComponent'
