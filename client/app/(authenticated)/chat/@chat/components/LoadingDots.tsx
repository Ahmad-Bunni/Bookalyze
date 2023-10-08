export default function LoadingDots() {
  return (
    <div className="mx-2 flex gap-1">
      <Dot />
      <Dot className="animation-delay-200" />
      <Dot className="animation-delay-400" />
    </div>
  )
}

const Dot = ({ className }: { className?: string }) => {
  return <span className={`rounded-ful animate-loader pb-2 text-5xl ${className}`}>.</span>
}
