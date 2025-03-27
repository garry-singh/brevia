import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "Basic",
    name: "Basic",
    description: "For individual users",
    price: 0,
    features: [
      "3 PDF summaries per month",
      "Standard processing speed",
      "Basic email support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "Pro",
    name: "Pro",
    description: "For power users and small teams",
    price: 9.99,
    features: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown export",
    ],
    paymentLink: "",
    priceId: "",
  },
];

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  paymentLink: string;
  priceId: string;
};

const PricingCard = ({
  id,
  name,
  description,
  price,
  features,
  paymentLink,
  priceId,
}: Plan) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
          id === "Pro" && "border-emerald-600 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-2xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon
                className="text-emerald-800 text-extrabold"
                size={18}
              />
              <span>{feature}</span>
            </li>
          ))}
        </div>
        <button className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-800 to-emerald-500 hover:from-emerald-500 hover:to-emerald-800 text-white border-2 py-2",
              id === "Pro" ? "border-emerald-900" : "border-gray-100"
            )}
          >
            Buy Now <ArrowRightIcon size={18} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-4xl mb-8 text-emerald-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
