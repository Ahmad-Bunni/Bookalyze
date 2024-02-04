import Link from 'next/link'
import { ReactNode } from 'react'

export function Tile({ title, path, icon }: { title: string; path: string; icon: ReactNode }) {
  return (
    <Link href={path} className="rounded-lg shadow ">
      <div className="flex items-center justify-between p-4">
        <span className="text-lg">{title}</span>

        {icon}
      </div>
    </Link>
  )
}
