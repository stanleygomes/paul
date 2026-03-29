"use client";

import Link from "next/link";

import { useTranslation } from "react-i18next";

export function SettingsHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm font-bold text-foreground/50 transition-colors hover:text-foreground"
      >
        ← {t("settings.back")}
      </Link>
      <h1 className="mb-8 text-4xl font-black tracking-tight text-foreground">
        {t("settings.title")}
      </h1>
    </>
  );
}
