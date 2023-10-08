export default function LoadingDots() {
  return (
    <div className="flex gap-1">
      <Dot />
      <Dot className="animation-delay-200" />
      <Dot className="animation-delay-400" />
    </div>
  )
}

const Dot = ({ className }: { className?: string }) => {
  return <span className={`rounded-ful animate-loader text-xl ${className}`}>.</span>
}
