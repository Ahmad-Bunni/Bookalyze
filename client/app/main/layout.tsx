import { ReactNode } from 'react'
import { AppHeader } from './components/AppHeader'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />

      <div>{children}</div>
    </>
  )
}
