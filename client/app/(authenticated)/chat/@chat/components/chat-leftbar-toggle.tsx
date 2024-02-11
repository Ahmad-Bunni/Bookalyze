'use client'

import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useSidebar } from '../context/sidebar-context'

export function ChatLeftToggle() {
  const { isVisible, toggle } = useSidebar()

  return (
    <div className="pb-16">
      <ChevronRight
        onClick={toggle}
        className={clsx('relative top-1/2 h-16 cursor-pointer hover:opacity-60', {
          'rotate-180 transform': isVisible,
        })}
        size={24}
      />
    </div>
  )
}
