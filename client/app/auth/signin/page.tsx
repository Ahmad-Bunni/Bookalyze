import SignInProvider from './components/SignInProvider'

export default async function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-bold">Welcome to Bookalyze</h1>

        <p className="text-base">Discover Bookalyze! Your gateway to AI-driven knowledge.</p>
      </div>

      <div className="flex max-w-lg flex-col justify-end">
        <SignInProvider key="google" provider="google" />
      </div>
    </div>
  )
}
