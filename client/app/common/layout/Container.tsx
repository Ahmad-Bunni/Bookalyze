import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto h-full max-w-7xl px-6 md:px-12 xl:px-6">{children}</div>
}

export function SubContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6">{children}</div>
}
