import { Container } from '../common/layout/Container'
import { MainHeader } from './components/MainHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <MainHeader />

      {children}
    </Container>
  )
}
