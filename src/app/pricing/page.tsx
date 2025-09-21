'use client';

import { PricingCard } from "@/components/pricing/PricingCard";
import { pricingPlans } from "@/config/pricing";

export default function PricingPage() {
  const handleGetStarted = (plan: string) => {
    console.log(`Selected plan: ${plan}`);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">
          Choose the perfect plan for your legal document needs
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            popular={plan.popular}
            onClick={() => handleGetStarted(plan.title)}
          />
        ))}
      </div>
    </div>
  )
}