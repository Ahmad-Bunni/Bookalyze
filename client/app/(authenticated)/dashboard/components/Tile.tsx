import Link from 'next/link'
import { ReactNode } from 'react'

export function Tile({ title, path, icon }: { title: string; path: string; icon: ReactNode }) {
  return (
    <Link href={path} className="rounded-lg  bg-zinc-100 shadow dark:bg-zinc-700">
      <div className="flex items-center justify-between p-4">
        <span className="text-lg text-zinc-700 dark:text-zinc-300">{title}</span>

        {icon}
      </div>
    </Link>
  )
}
