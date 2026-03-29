import React from "react";
import { useTranslation } from "react-i18next";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="testimonials"
      className="bg-main/5 py-24 md:py-32 border-y-4 border-border overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="inline-block border-4 border-border bg-main px-8 py-4 text-4xl font-black uppercase tracking-tighter text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] md:text-6xl">
            {t("landing.testimonials.title")}
          </h2>
          <p className="max-w-xs text-sm font-bold text-foreground/60 uppercase tracking-widest leading-none mb-2">
            {t("landing.testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <TestimonialCard
            name={t("landing.testimonials.items.marcos.name")}
            role={t("landing.testimonials.items.marcos.role")}
            content={t("landing.testimonials.items.marcos.content")}
            avatarColor="bg-orange-400"
          />
          <TestimonialCard
            name={t("landing.testimonials.items.juliana.name")}
            role={t("landing.testimonials.items.juliana.role")}
            content={t("landing.testimonials.items.juliana.content")}
            avatarColor="bg-blue-400"
          />
          <TestimonialCard
            name={t("landing.testimonials.items.ricardo.name")}
            role={t("landing.testimonials.items.ricardo.role")}
            content={t("landing.testimonials.items.ricardo.content")}
            avatarColor="bg-yellow-400"
          />
          <TestimonialCard
            name={t("landing.testimonials.items.ricardo.name")}
            role={t("landing.testimonials.items.ricardo.role")}
            content={t("landing.testimonials.items.ricardo.content")}
            avatarColor="bg-yellow-400"
          />
        </div>
      </div>
    </section>
  );
}
