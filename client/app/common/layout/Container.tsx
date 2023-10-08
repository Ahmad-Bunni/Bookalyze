import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto h-full max-w-screen-2xl px-6 md:px-12 xl:px-6">{children}</div>
}
