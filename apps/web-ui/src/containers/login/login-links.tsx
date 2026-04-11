"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { LANDPAGE_URL } from "../../config/api-config";

export default function LoginLinks() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 md:gap-6 text-sm font-bold text-foreground/40 uppercase tracking-widest">
      <Link
        href={LANDPAGE_URL || "/"}
        className="hover:text-main underline decoration-2 underline-offset-2"
      >
        {t("login.links.home")}
      </Link>
      <Link
        href="/privacy"
        className="hover:text-main underline decoration-2 underline-offset-2"
      >
        {t("login.links.privacy")}
      </Link>
      <Link
        href="/terms"
        className="hover:text-main underline decoration-2 underline-offset-2"
      >
        {t("login.links.terms")}
      </Link>
    </div>
  );
}
