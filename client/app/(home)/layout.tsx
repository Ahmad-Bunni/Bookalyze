import { NavigationMenu } from './components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationMenu />

      {children}
    </>
  )
}
