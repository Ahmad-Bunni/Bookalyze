import Link from 'next/link'
import { NavLink } from '.'

export function NavigationMenu() {
  return (
    <div className="flex items-center justify-between max-sm:hidden">
      <Link href="/" aria-label="logo">
        <h1 className="text-2xl font-bold ">Bookalyze</h1>
        <h4 className="text-xs">AI-Powered Document Analyzer</h4>
      </Link>

      <ul className="flex items-center text-sm font-medium tracking-wide transition">
        <NavLink href="#features" text="Features" />
        <NavLink href="#pricing" text="Pricing" />
        <NavLink href="#solution" text="Solution" />
        <Link
          href="/dashboard"
          className="relative inset-0 flex h-9 w-full items-center justify-center rounded-full px-4"
        >
          <span className="relative text-sm font-semibold">Get Started</span>
        </Link>
      </ul>
    </div>
  )
}
