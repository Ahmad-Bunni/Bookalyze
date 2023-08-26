import { Container } from '@common/Container'
import Link from 'next/link'

function HeaderLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <a href={href} className="block md:px-4 hover:text-zinc-400">
        <span className="capitalize">{text}</span>
      </a>
    </li>
  )
}

export function AppHeader() {
  return (
    <header>
      <nav className="max-lg:hidden w-full pt-4 pb-8">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/home" aria-label="logo">
              <h1 className="text-2xl font-bold text-zinc-700 dark:text-white">
                Bookalyze
              </h1>
              <h4 className="text-xs dark:text-zinc-400 text-zinc-500">
                AI-Powered Document Analyzer
              </h4>
            </Link>

            <div className="flex flex-col lg:flex-row items-center lg:w-auto w-full gap-4">
              <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0 transition">
                <HeaderLink href="#features" text="Features" />
                <HeaderLink href="#pricing" text="Pricing" />
                <HeaderLink href="#solution" text="Solution" />
              </ul>

              <div className="mt-12 lg:mt-0">
                <Link
                  href="/chat"
                  className="relative flex h-9 w-full items-center justify-center px-4  inset-0 rounded-full bg-primary transition duration-200 hover:scale-105 active:duration-75 active:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-white">
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}
