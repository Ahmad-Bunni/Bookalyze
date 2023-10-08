import { Container } from '../common/layout/Container'
import { NextAuthProvider } from '../providers'
import { AuthenticatedHeader } from './components/AuthenticatedHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="flex h-full flex-col">
        <NextAuthProvider>
          <AuthenticatedHeader />
        </NextAuthProvider>

        {children}
      </div>
    </Container>
  )
}
