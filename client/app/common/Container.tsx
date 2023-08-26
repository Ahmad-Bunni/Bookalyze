import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl h-full mx-auto px-6 md:px-12 xl:px-6">
      {children}
    </div>
  )
}
