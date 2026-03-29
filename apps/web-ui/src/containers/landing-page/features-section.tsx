import { Brain, Target, Flag, BellRing } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-20">
        <h2 className="inline-block border-4 border-border bg-secondary-background px-8 py-4 text-4xl font-black uppercase tracking-tighter text-foreground shadow-[8px_8px_0px_0px_var(--border)] md:text-6xl">
          Built for focus.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <FeatureCard
          title="Mental Clarity"
          description="Stop holding everything in your head. Done. is designed to help you offload your thoughts instantly so you can actually focus on working."
          icon={Brain}
          color="bg-main-light"
        />
        <FeatureCard
          title="Zero Distractions"
          description="Most apps are cluttered with features you'll never use. We keep it simple: one list, one goal, and a pure sense of accomplishment."
          icon={Target}
          color="bg-secondary-background"
        />
        <FeatureCard
          title="Master Priorities"
          description="Instantly mark what's critical and what can wait. Our visual hierarchy ensures you always know your most important next step."
          icon={Flag}
          color="bg-secondary-background"
        />
        <FeatureCard
          title="Smart Follow-ups"
          description="Get gentle nudges that keep you moving forward. We handle the reminders so you can keep your focus where it belongs: on the task."
          icon={BellRing}
          color="bg-main-light"
        />
      </div>
    </section>
  );
}
