import { Message } from 'ai'
import { MessageComponent } from './MessageComponent'

export function ChatDisplay({ messages }: { messages: Message[] }) {
  return (
    <div className="m-auto mx-4 flex flex-col gap-1 lg:mx-auto lg:max-w-3xl">
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  )
}
