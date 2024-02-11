'use client'

import clsx from 'clsx'
import { useSidebar } from '../context/sidebar-context'

export function ChatLeftbar() {
  const { isVisible } = useSidebar()

  return (
    <div
      className={clsx(
        { ['relative h-full justify-center overflow-hidden border-r bg-secondary transition-all duration-300']: true },
        { ['w-[260px]']: isVisible },
        { ['w-[0px]']: !isVisible },
      )}
    >
      <div className="flex h-full min-w-[260px] flex-col gap-2 p-2">
        <input className="rounded-lg border p-2 outline-none" placeholder="Search" />

        <button className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent">
          <div className="font-semibold">Conversation A</div>
          <div className="text-xs">{new Date().toDateString()}</div>
        </button>

        <button className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent">
          <div className="font-semibold">Conversation A</div>
          <div className="text-xs">{new Date().toDateString()}</div>
        </button>
      </div>
    </div>
  )
}
