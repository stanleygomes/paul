"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export function LegalSection() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-lg font-black text-foreground">
        {t("settings.legal.title")}
      </h2>
      <Link
        href="/privacy"
        className="group flex flex-col gap-4 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        <div className="flex items-center justify-between group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform">
          <div>
            <h3 className="text-sm font-black text-foreground">
              {t("settings.legal.privacy")}
            </h3>
            <p className="mt-1 text-xs font-medium text-foreground/60 leading-tight">
              {t("settings.legal.privacy_desc")}
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none">
            →
          </div>
        </div>
      </Link>

      <Link
        href="/terms"
        className="group flex flex-col gap-4 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        <div className="flex items-center justify-between group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform">
          <div>
            <h3 className="text-sm font-black text-foreground">
              {t("settings.legal.terms")}
            </h3>
            <p className="mt-1 text-xs font-medium text-foreground/60 leading-tight">
              {t("settings.legal.terms_desc")}
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none">
            →
          </div>
        </div>
      </Link>
    </>
  );
}
