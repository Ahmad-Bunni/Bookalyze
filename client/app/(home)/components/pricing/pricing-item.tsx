import { ReactNode } from 'react'

interface PricingItemProps {
  tier: string
  children: ReactNode
}

export function PricingItem({ tier, children }: PricingItemProps) {
  return (
    <div className="dark:bg-blue-800">
      <div className="space-y-2 p-6">
        <h5 className="text-2xl font-semibold">{tier}</h5>
        <ul className="text-md list-inside list-disc space-y-4">{children}</ul>
      </div>
    </div>
  )
}
