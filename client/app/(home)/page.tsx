import { Features } from './components/features'
import { PricingContainer } from './components/pricing'

export default function Main() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="mx-auto text-center">
        <h1 className="text-2xl font-bold lg:text-5xl">
          <p>Dive Deeper with AI</p>
          <p>Unearth Your File Insights</p>
        </h1>
      </div>

      <Features />

      <PricingContainer />
    </div>
  )
}
