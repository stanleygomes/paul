"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function LoginHeader() {
  const { t } = useTranslation();

  return (
    <div className="mb-12 flex flex-col items-center gap-6">
      <Link href="/" className="group">
        <div className="flex h-16 w-16 items-center justify-center rounded-base border-4 border-border bg-main text-2xl font-black uppercase text-main-foreground shadow-shadow transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_var(--border)]">
          D.
        </div>
      </Link>
      <h2 className="text-center text-4xl font-black uppercase tracking-tighter text-foreground drop-shadow-sm md:text-5xl">
        {t("login.title")}
      </h2>
    </div>
  );
}
