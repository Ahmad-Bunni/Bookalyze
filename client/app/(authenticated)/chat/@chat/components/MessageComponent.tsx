import { Container } from '@/app/common/layout/Container'
import { Message } from 'ai'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export const MessageComponent = React.memo(({ message }: { message: Message }) => {
  return (
    <Container>
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
    </Container>
  )
})

MessageComponent.displayName = 'MessageComponent'
