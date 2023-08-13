import { Container } from '@common/Container'
import Link from 'next/link'

export function ChatHeader() {
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
                <Link className="md:px-4" href="#upload">
                  Sign Out
                </Link>
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}
