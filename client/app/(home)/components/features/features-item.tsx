export function FeatureItem({ title, content }: { title: string; content: string }) {
  return (
    <div className="text-center lg:w-1/3">
      <h6 className="text-lg font-semibold">{title}</h6>
      <p className="mt-2 text-sm font-medium">{content}</p>
    </div>
  )
}
