import { AuthenticatedNavbar } from '@/app/(authenticated)/auth-navbar'
import { NextAuthProvider } from '@/app/auth-provider'
import { Container } from '@/components/ui/container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextAuthProvider>
        <AuthenticatedNavbar />
      </NextAuthProvider>

      <Container>{children}</Container>
    </>
  )
}
