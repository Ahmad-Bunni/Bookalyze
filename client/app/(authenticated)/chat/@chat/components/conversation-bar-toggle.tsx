'use client'

import { useChatBarStore } from '@/app/(authenticated)/chat/@chat/store'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

export function ConversationBarToggle() {
  const { isVisible, toggleVisibility } = useChatBarStore()

  return (
    <div className="pb-16">
      <ChevronRight
        onClick={toggleVisibility}
        className={clsx('relative top-1/2 h-16 cursor-pointer hover:opacity-60', {
          'rotate-180 transform': isVisible,
        })}
        size={24}
      />
    </div>
  )
}
