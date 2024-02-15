'use client'

import Chat from './@chat/page'
import { useChatStore } from './@chat/store'

export default function Page() {
  const { currentConversation } = useChatStore()

  return <Chat key={currentConversation?.id} initialMessages={currentConversation?.messages ?? []} />
}
