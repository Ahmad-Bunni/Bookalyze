import { PricingItem } from '.'

export function PricingContainer() {
  return (
    <>
      <h2 className="my-8 text-2xl font-bold max-lg:text-center lg:text-4xl">Our Pricing Tiers</h2>

      <div className="grid overflow-hidden rounded-3xl  max-lg:divide-y sm:grid-cols-1 lg:grid-cols-3 lg:divide-x xl:grid-cols-3">
        <PricingItem tier="Free Tier">
          <li>Access to Standard AI Model</li>
          <li>Process a Single Document</li>
          <li>1000 Word Limit</li>
          <li>Up to 10 Questions</li>
        </PricingItem>

        <PricingItem tier="Premium Tier">
          <li>Access to Premium AI Model</li>
          <li>Process Up to 5 Documents</li>
          <li>100K Word Limit Per Document</li>
          <li>Up to 100 Questions</li>
        </PricingItem>

        <PricingItem tier="Pay-As-You-Go">
          <li>Most Cost-Effective Solution</li>
          <li>Access to Premium AI Model</li>
          <li>Unlimited Until Credit Depleted</li>
          <li>Perfect for Beginners</li>
        </PricingItem>
      </div>
    </>
  )
}
