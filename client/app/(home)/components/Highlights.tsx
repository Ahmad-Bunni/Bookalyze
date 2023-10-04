function HighlightItem({ title, content }: { title: string; content: string }) {
  return (
    <div className="text-center lg:w-1/3">
      <h6 className="text-lg font-semibold text-zinc-600 dark:text-zinc-200">{title}</h6>
      <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">{content}</p>
    </div>
  )
}

export function Highlights() {
  return (
    <div className="flex gap-6 border-y border-zinc-100 py-8 dark:border-zinc-800 max-lg:flex-col">
      <HighlightItem title="Instant AI Insights" content="Upload your file and uncover real-time insights." />
      <HighlightItem title="Precision Filters" content="Enhance answers with optional page filters." />
      <HighlightItem title="Supported File Types" content=" • PDF • Word • CSV • TXT" />
    </div>
  )
}
