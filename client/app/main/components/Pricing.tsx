import { Container } from '@common/Container';
import { ReactNode } from 'react';

function PricingItem({
  tier,
  children,
}: {
  tier: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-zinc-100 dark:bg-blue-800">
      <div className="space-y-2 p-6">
        <h5 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          {tier}
        </h5>

        <ul className="list-disc list-inside text-md space-y-4">{children}</ul>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <Container>
      <h2 className="max-lg:text-center my-8 text-2xl font-bold text-zinc-700 dark:text-white md:text-4xl">
        Our Pricing Tiers
      </h2>

      <div className="grid lg:divide-x max-lg:divide-y dark:divide-zinc-800 overflow-hidden rounded-3xl sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
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
    </Container>
  );
}
