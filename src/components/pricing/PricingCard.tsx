import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
  onClick?: () => void;
}

export function PricingCard({
  title,
  price,
  features,
  popular = false,
  onClick,
}: PricingCardProps) {
  return (
    <div className={`rounded-lg p-6 ${popular ? 'border-2 border-blue-500 shadow-lg' : 'border'}`}>
      <div className="space-y-4">
        {popular && (
          <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-500 bg-blue-50 rounded-full">
            Most Popular
          </span>
        )}
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold">{price}</span>
          <span className="ml-1 text-gray-500">/month</span>
        </div>
        <ul className="space-y-3 py-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          onClick={onClick}
          className={`w-full ${
            popular
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-800 hover:bg-gray-900'
          }`}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}