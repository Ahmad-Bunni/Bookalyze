'use client'

import GoogleIcon from '@public/google.svg'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function SignInProvider({ provider }: { provider: string }) {
  return (
    <button
      key={provider}
      onClick={() => signIn(provider, { callbackUrl: '/chat' })}
      type="button"
      className="active:duration-1500 flex w-full items-center justify-between rounded-lg bg-primary px-5 py-2.5 font-medium
      text-zinc-50 transition duration-75 hover:scale-105 active:bg-blue-700"
    >
      <Image width={32} priority={true} src={GoogleIcon} alt="Google" />

      <section>
        Sign in with
        <span className="text-md font-bold capitalize"> {provider}</span>
      </section>
    </button>
  )
}
