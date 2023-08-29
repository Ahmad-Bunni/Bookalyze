import { ReactNode } from 'react'
import { NextAuthProvider } from '../providers'
import { ChatHeader } from './components/ChatHeader'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      <div className="flex h-full flex-col">
        <ChatHeader />

        {children}
      </div>
    </NextAuthProvider>
  )
}
