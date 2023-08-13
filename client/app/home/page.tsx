import { Highlights } from './components/Highlights'
import { Intro } from './components/Intro'
import { Pricing } from './components/Pricing'

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-8">
      <Intro />
      <Highlights />
      <Pricing />
    </div>
  )
}
