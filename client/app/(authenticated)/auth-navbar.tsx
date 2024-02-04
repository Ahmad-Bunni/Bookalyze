import Link from 'next/link'
import { SignOut } from '../auth/signout/SignOut'

export function AuthenticatedNavbar() {
  return (
    <div className="sticky top-0 bg-inherit shadow-sm">
      <div className="mx-auto flex w-full max-w-5xl justify-between px-4 py-6">
        <Link href="/dashboard" aria-label="Dashboard">
          <h1 className="text-2xl font-bold">Bookalyze</h1>
          <h4 className="text-xs">AI-Powered Document Analyzer</h4>
        </Link>

        <SignOut />
      </div>
    </div>
  )
}
