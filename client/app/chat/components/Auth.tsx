'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const SignOutButton = () => {
  const { data: session } = useSession()

  return (
    <>
      {session?.user?.name}
      <button className="md:px-4" onClick={() => signOut({ callbackUrl: '/' })}>
        Sign Out
      </button>
    </>
  )
}

export const SignInButton = () => {
  return (
    <Link
      href="/chat"
      className="relative inset-0 flex h-9 w-full items-center justify-center rounded-full bg-primary px-4 transition duration-200 hover:scale-105 active:scale-95 active:duration-75 sm:w-max"
    >
      <span className="relative text-sm font-semibold text-white">Get Started</span>
    </Link>
  )
}
