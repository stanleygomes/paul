"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function LoginLinks() {
  const { t } = useTranslation();

  return (
    <div className="mt-8 md:mt-12 flex gap-4 md:gap-6 text-[10px] md:text-sm font-bold text-foreground/40 uppercase tracking-widest">
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-main underline decoration-2 underline-offset-2"
      >
        {t("login.links.home")}
      </Link>
      <Link
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-main underline decoration-2 underline-offset-2"
      >
        {t("login.links.privacy")}
      </Link>
      <Link
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-main underline decoration-2 underline-offset-2"
      >
        {t("login.links.terms")}
      </Link>
    </div>
  );
}
