import { Message } from 'ai'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export const MessageComponent = React.memo(({ message }: { message: Message }) => {
  return (
    <div
      key={message.id}
      className={`rounded-md p-4 dark:border-zinc-600 
          ${message.role === 'user' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-zinc-100 dark:bg-zinc-800'}`}
    >
      {message.role === 'user' ? (
        message.content
      ) : (
        <ReactMarkdown
          remarkPlugins={[gfm]}
          className="prose max-w-none dark:prose-invert prose-code:before:hidden prose-code:after:hidden"
        >
          {message.content}
        </ReactMarkdown>
      )}
    </div>
  )
})

MessageComponent.displayName = 'MessageComponent'
