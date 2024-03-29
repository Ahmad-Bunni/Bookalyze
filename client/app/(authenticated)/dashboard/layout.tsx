import { AuthenticatedNavbar } from '@/app/(authenticated)/auth-navbar'
import { NextAuthProvider } from '@/app/auth-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextAuthProvider>
        <AuthenticatedNavbar />
      </NextAuthProvider>

      {children}
    </>
  )
}
