"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function LoginFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-border p-4 text-center text-xs font-black uppercase tracking-wider text-background md:p-6 italic">
      {t("login.footer", { year: currentYear })}
    </div>
  );
}
