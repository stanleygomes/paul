import React from "react";
import { useTranslation } from "react-i18next";
import { TestimonialCard } from "./testimonial-card";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="testimonials"
      className="bg-main/5 py-24 md:py-32 border-y-4 border-border overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="inline-block break-words border-4 border-border bg-main px-6 py-3 text-2xl font-black uppercase tracking-tighter text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] sm:px-8 sm:py-4 sm:text-4xl md:text-6xl">
            {t("landing.testimonials.title")}
          </h2>
          <p className="max-w-xs text-sm font-bold text-foreground/60 uppercase tracking-widest leading-none mb-2">
            {t("landing.testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {["joander", "marcotulio", "pablo", "thiago"].map((id, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TestimonialCard
                name={t(`landing.testimonials.items.${id}.name`)}
                role={t(`landing.testimonials.items.${id}.role`)}
                content={t(`landing.testimonials.items.${id}.content`)}
                avatarUrl={`/images/testimonial-${id}.png`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
