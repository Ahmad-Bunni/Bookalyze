import { Container } from '@common/Container'

function HighlightItem({ title, content }: { title: string; content: string }) {
  return (
    <div className="text-center lg:w-1/3">
      <h6 className="text-lg font-semibold text-zinc-600 dark:text-zinc-200">
        {title}
      </h6>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400 font-medium text-sm">
        {content}
      </p>
    </div>
  )
}

export function Highlights() {
  return (
    <Container>
      <div className="flex max-lg:flex-col py-8 border-y border-zinc-100 dark:border-zinc-800 gap-6">
        <HighlightItem
          title="Instant AI Insights"
          content="Upload your file and uncover real-time insights."
        />
        <HighlightItem
          title="Precision Filters"
          content="Enhance answers with optional page filters."
        />

        <HighlightItem
          title="Supported File Types"
          content=" • PDF • Word • CSV • TXT"
        />
      </div>
    </Container>
  )
}
