import { Message } from 'ai'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export const ChatMessage = React.memo(({ message }: { message: Message }) => {
  return (
    <>
      {message.role === 'user' ? (
        message.content
      ) : (
        <ReactMarkdown
          remarkPlugins={[gfm]}
          className="prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden max-w-none"
        >
          {message.content}
        </ReactMarkdown>
      )}
    </>
  )
})

ChatMessage.displayName = 'MessageComponent'
