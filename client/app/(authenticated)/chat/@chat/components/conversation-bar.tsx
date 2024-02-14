'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useChatBarStore, useChatStore } from '../store'

export function ConversationsBar() {
  const { isVisible } = useChatBarStore()
  const {
    selectedConversation,
    conversations,
    fetchConversations,
    searchConversations,
    addNewConversation,
    setSelectedConversation,
  } = useChatStore()

  useEffect(() => {
    fetchConversations()
  })

  return (
    <div
      className={clsx(
        'relative h-full justify-center overflow-hidden border-r bg-secondary transition-all duration-300',
        { 'w-[260px]': isVisible },
        { 'w-[0px]': !isVisible },
      )}
    >
      <div className="flex h-full min-w-[260px] flex-col gap-2 p-2">
        <input
          onChange={(e) => searchConversations(e.target.value)}
          className="rounded-lg border p-2 outline-none"
          placeholder="Search"
        />

        <Button onClick={addNewConversation} className="bg-primary">
          New Conversation
        </Button>

        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation.id)}
            className={clsx('flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent', {
              'bg-accent': conversation.id === selectedConversation?.id,
            })}
          >
            <div className="font-semibold">{conversation.id}</div>
            <div className="text-xs">{conversation.createdAt.toDateString()}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
