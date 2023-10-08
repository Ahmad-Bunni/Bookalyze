import Link from 'next/link'
import { SignOut } from '../../auth/signout/SignOut'

export function AuthenticatedHeader() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/dashboard" aria-label="logo">
        <h1 className="text-2xl font-bold text-zinc-700 dark:text-white">Bookalyze</h1>
        <h4 className="text-xs text-zinc-500 dark:text-zinc-400">AI-Powered Document Analyzer</h4>
      </Link>

      <SignOut />
    </div>
  )
}
