import { useTranslation } from "react-i18next";
import { Brain, Target, Flag, BellRing } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-20">
        <h2 className="inline-block break-words border-4 border-border bg-secondary-background px-6 py-3 text-2xl font-black uppercase tracking-tighter text-foreground shadow-[8px_8px_0px_0px_var(--border)] sm:px-8 sm:py-4 sm:text-4xl md:text-6xl">
          {t("landing.features.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <FeatureCard
          title={t("landing.features.cards.clarity.title")}
          description={t("landing.features.cards.clarity.description")}
          icon={Brain}
          color="bg-main-light"
        />
        <FeatureCard
          title={t("landing.features.cards.distractions.title")}
          description={t("landing.features.cards.distractions.description")}
          icon={Target}
          color="bg-secondary-background"
        />
        <FeatureCard
          title={t("landing.features.cards.priorities.title")}
          description={t("landing.features.cards.priorities.description")}
          icon={Flag}
          color="bg-secondary-background"
        />
        <FeatureCard
          title={t("landing.features.cards.followups.title")}
          description={t("landing.features.cards.followups.description")}
          icon={BellRing}
          color="bg-main-light"
        />
      </div>
    </section>
  );
}
