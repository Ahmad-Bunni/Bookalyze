import { Highlights } from './components/Highlights'
import { Intro } from './components/Intro'
import { Pricing } from './components/Pricing'

export default function Main() {
  return (
    <div className="flex w-full flex-col gap-8">
      <Intro />
      <Highlights />
      <Pricing />
    </div>
  )
}
