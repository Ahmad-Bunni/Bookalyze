import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-screen-xl space-y-8 px-8 py-4">{children}</div>
}
