import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Message, Role } from '../models'
import LoadingDots from './LoadingDots'

export function ChatDisplay({
  messages,
  isLoading,
}: {
  messages: Message[]
  isLoading: boolean
}) {
  return (
    <div className="m-auto mx-4 flex flex-col gap-1 lg:mx-auto lg:max-w-3xl">
      {messages.map((message, index) => (
        <div
          key={message.id || index}
          className={`rounded-md p-4 dark:border-zinc-600 
          ${
            index % 2 === 0
              ? 'bg-zinc-200 dark:bg-zinc-700'
              : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          {message.role === Role.USER ? (
            message.text
          ) : (
            <ReactMarkdown
              remarkPlugins={[gfm]}
              className="prose max-w-none dark:prose-invert"
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="animate-fadeIn rounded-md bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
          <LoadingDots />
        </div>
      )}
    </div>
  )
}
