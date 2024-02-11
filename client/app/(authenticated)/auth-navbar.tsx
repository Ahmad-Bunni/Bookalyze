import { ModeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'
import { SignOut } from '../auth/signout/SignOut'

export function AuthenticatedNavbar() {
  return (
    <div className="sticky top-0 bg-background">
      <div className="flex w-full justify-between">
        <Link href="/dashboard" aria-label="Dashboard">
          <h1 className="text-2xl font-bold">Bookalyze</h1>
          <h4 className="text-xs">AI-Powered Document Analyzer</h4>
        </Link>

        <div className="flex items-center space-x-4">
          <SignOut />
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
