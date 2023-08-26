import { Container } from '@/app/common/layout/Container'

export function Intro() {
  return (
    <Container>
      <div className="mx-auto text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl lg:text-5xl">
          <p>Dive Deeper with AI</p>
          <p>Unearth Your File Insights</p>
        </h1>
      </div>
    </Container>
  )
}
