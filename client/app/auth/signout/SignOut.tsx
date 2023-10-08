'use client'

import { signOut, useSession } from 'next-auth/react'

export function SignOut() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center space-x-2 font-medium">
      <label>{session?.user?.name}</label>

      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
    </div>
  )
}
