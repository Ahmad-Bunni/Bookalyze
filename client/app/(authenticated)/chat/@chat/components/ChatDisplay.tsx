import { Message } from 'ai'
import LoadingDots from './LoadingDots'
import { MessageComponent } from './MessageComponent'

export function ChatDisplay({ messages, isLoading }: { messages: Message[]; isLoading: Boolean }) {
  return (
    <div className="m-auto mx-4 flex flex-col gap-1 lg:mx-auto lg:max-w-3xl">
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}

      {isLoading && messages[messages.length - 1].role === 'user' && <LoadingDots />}
    </div>
  )
}
