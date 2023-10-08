import Link from 'next/link'
import { HeaderLink } from './HeaderLink'

export function MainHeader() {
  return (
    <div className="flex items-center justify-between max-sm:hidden">
      <Link href="/" aria-label="logo">
        <h1 className="text-2xl font-bold text-zinc-700 dark:text-white">Bookalyze</h1>
        <h4 className="text-xs text-zinc-500 dark:text-zinc-400">AI-Powered Document Analyzer</h4>
      </Link>

      <ul className="flex items-center text-sm font-medium tracking-wide transition">
        <HeaderLink href="#features" text="Features" />
        <HeaderLink href="#pricing" text="Pricing" />
        <HeaderLink href="#solution" text="Solution" />
        <Link
          href="/dashboard"
          className="relative inset-0 flex h-9 w-full items-center justify-center rounded-full bg-primary px-4 transition duration-200 hover:scale-105 active:scale-95 active:duration-75"
        >
          <span className="relative text-sm font-semibold text-white">Get Started</span>
        </Link>
      </ul>
    </div>
  )
}
