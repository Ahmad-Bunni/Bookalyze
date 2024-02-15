'use client'

import { Message } from 'ai'
import { Bot, User2 } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export const ChatMessage = React.memo(({ message }: { message: Message }) => {
  return (
    <div className="p-4">
      {message.role === 'user' ? (
        <div className="flex flex-col space-y-2">
          <div className="flex gap-2">
            <User2 size={22} />
            <span className="font-semibold">You</span>
          </div>
          <div className="flex flex-col">
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <div className="flex gap-2">
            <Bot size={26} />
            <span className="font-semibold">Bookalyze</span>
          </div>

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
