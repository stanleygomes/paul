"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  isPopular = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col p-8 rounded-base border-4 border-border ${
        isPopular
          ? "bg-main text-main-foreground scale-105 z-10"
          : "bg-background text-foreground"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-black border-2 border-border font-black uppercase text-xs rounded-full shadow-[2px_2px_0px_0px_var(--border)]">
          Best fit
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-black uppercase tracking-wider mb-2">
          {title}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black italic">{price}</span>
          <span className="text-sm font-bold opacity-60">/month</span>
        </div>
        <p className="mt-4 text-sm font-bold opacity-70">{description}</p>
      </div>

      <ul className="flex-1 flex flex-col gap-3 mb-10">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm font-bold">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 border-border ${isPopular ? "bg-main-foreground text-main" : "bg-main text-main-foreground"}`}
            >
              <Check className="h-3 w-3 stroke-[4px]" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="/login"
        className={`flex h-12 w-full items-center justify-center rounded-base border-4 border-border px-6 text-sm font-black uppercase shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none hover:no-underline ${
          isPopular
            ? "bg-secondary-background text-foreground hover:bg-background"
            : "bg-main text-main-foreground hover:bg-main/90"
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-5xl px-6 py-24 md:py-40 scroll-mt-20 border-t-4 border-border"
    >
      <div className="mb-20 text-center">
        <h2 className="inline-block border-4 border-border bg-secondary-background px-8 py-4 text-4xl font-black uppercase tracking-tighter text-foreground shadow-[8px_8px_0px_0px_var(--border)] md:text-6xl">
          Choose Focus.
        </h2>
        <p className="mt-8 text-xl font-bold text-foreground/50">
          Get started for free or unlock the full power of Done.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-stretch max-w-4xl mx-auto">
        <PricingCard
          title="Started"
          price="$0"
          description="Everything you need to stop holding tasks in your head."
          buttonText="Start for free"
          features={[
            "Unlimited Daily Tasks",
            "Up to 3 Projects",
            "PWA & Mobile Support",
            "Core Goal Management",
            "Web App Access",
          ]}
        />
        <PricingCard
          title="Pro"
          price="$5"
          description="Unlock the full potential of your focus and workflow."
          isPopular={true}
          buttonText="Upgrade to Pro"
          features={[
            "Everything in Started",
            "Unlimited Projects",
            "Advanced Notifications",
            "Weekly Productivity Stats",
            "Priority Early Access",
            "Custom Themes",
          ]}
        />
      </div>
    </section>
  );
}
