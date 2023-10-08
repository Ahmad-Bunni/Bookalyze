import { Container } from '@/app/common/layout/Container'
import { NextAuthProvider } from '../../providers'
import { AuthenticatedHeader } from '../components/AuthenticatedHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <NextAuthProvider>
        <AuthenticatedHeader />
      </NextAuthProvider>

      {children}
    </Container>
  )
}
