'use client'

import GoogleIcon from '@public/google.svg'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function SignInProvider({ provider }: { provider: string }) {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  return (
    <button
      key={provider}
      onClick={() => signIn(provider, { callbackUrl: callbackUrl })}
      type="button"
      className="active:duration-1500 flex w-full items-center justify-between rounded-lg px-5 py-2.5 font-medium
       transition duration-75 hover:scale-105"
    >
      <Image width={32} priority={true} src={GoogleIcon} alt="Google" />

      <section>
        Sign in with
        <span className="text-md font-bold capitalize"> {provider}</span>
      </section>
    </button>
  )
}
