'use client'

import { signOut, useSession } from 'next-auth/react'

export function SignOut() {
  const { data: session } = useSession()

  return (
    <div className="flex w-full flex-row items-center font-medium lg:w-auto lg:text-sm">
      {session?.user?.name}
      <button className="md:px-4" onClick={() => signOut({ callbackUrl: '/' })}>
        Sign Out
      </button>
    </div>
  )
}
