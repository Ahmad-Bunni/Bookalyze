import { SignInButton } from '@/app/chat/components/Auth'
import { Container } from '@/app/common/layout/Container'
import Link from 'next/link'

function HeaderLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <a href={href} className="block hover:text-zinc-400 md:px-4">
        <span className="capitalize">{text}</span>
      </a>
    </li>
  )
}

export function AppHeader() {
  return (
    <header>
      <nav className="w-full pb-8 pt-4 max-lg:hidden">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="logo">
              <h1 className="text-2xl font-bold text-zinc-700 dark:text-white">
                Bookalyze
              </h1>
              <h4 className="text-xs text-zinc-500 dark:text-zinc-400">
                AI-Powered Document Analyzer
              </h4>
            </Link>

            <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row">
              <ul className="flex flex-col gap-6 font-medium tracking-wide transition lg:flex-row lg:gap-0 lg:text-sm">
                <HeaderLink href="#features" text="Features" />
                <HeaderLink href="#pricing" text="Pricing" />
                <HeaderLink href="#solution" text="Solution" />
              </ul>

              <div className="mt-12 lg:mt-0">
                <SignInButton />
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}
