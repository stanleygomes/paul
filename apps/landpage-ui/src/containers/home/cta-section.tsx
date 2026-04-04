import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
      <div className="rounded-base border-8 border-border bg-secondary-background p-8 shadow-[16px_16px_0px_0px_var(--border)] md:p-20">
        <h2 className="mb-8 break-words text-3xl font-black uppercase tracking-tighter text-foreground md:text-7xl lg:text-8xl">
          {t("landing.cta.title")}
        </h2>
        <p className="mb-12 text-xl font-bold text-foreground/50">
          {t("landing.cta.subtitle")}
        </p>
        <Link
          href={process.env.NEXT_PUBLIC_WEB_UI_URL || "/"}
          className="inline-flex h-16 items-center justify-center rounded-base border-4 border-border bg-main px-12 text-xl font-black uppercase text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none hover:no-underline active:translate-x-2 active:translate-y-2 active:shadow-none"
        >
          {t("landing.cta.button")}
        </Link>
      </div>
    </section>
  );
}
