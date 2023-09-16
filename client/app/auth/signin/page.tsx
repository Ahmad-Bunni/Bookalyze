import { Container } from '@/app/common/layout/Container'
import { getProviders } from 'next-auth/react'
import SignInLink from './components/SignInProvider'

export default async function Page() {
  const providers = await getProviders()

  if (!providers) return

  return (
    <Container>
      <div className="mt-32 flex gap-8 bg-zinc-50 p-16 shadow-lg dark:bg-zinc-800 max-lg:flex-col max-lg:items-center max-lg:p-8">
        <div className="flex w-full flex-col justify-center space-y-2 p-4 max-lg:max-w-lg">
          <h1 className="text-2xl font-bold xl:text-4xl">Welcome to Bookalyze</h1>

          <p className="text-sm italic xl:text-base">
            Discover Bookalyze! Your gateway to AI-driven knowledge. Ask questions from documents to presentations, our
            AI technology empowers seamless information access. Embrace the future with Bookalyze.
          </p>
        </div>

        <div className="flex w-full max-w-lg flex-col justify-end gap-4 p-4">
          {Object.values(providers).map((provider) => (
            <SignInLink key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </Container>
  )
}