import { FeatureItem } from '.'

export function Features() {
  return (
    <div className="flex gap-6 border-y py-8 max-lg:flex-col">
      <FeatureItem title="Instant AI Insights" content="Upload your file and uncover real-time insights." />

      <FeatureItem title="Precision Filters" content="Enhance answers with optional page filters." />

      <FeatureItem title="Supported File Types" content=" • PDF • Word • CSV • TXT" />
    </div>
  )
}
