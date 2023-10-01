import { NextAuthProvider } from '../providers'
import { AuthenticatedHeader } from './components/AuthenticatedHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextAuthProvider>
        <AuthenticatedHeader />
      </NextAuthProvider>

      {children}
    </>
  )
}
