"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import LoginLinks from "./login-links";

export default function LoginFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-border p-4 text-center md:p-6 flex flex-col items-center gap-4">
      <LoginLinks />
      <div className="text-[10px] md:text-xs font-black uppercase tracking-wider text-background italic opacity-60">
        {t("login.footer", { year: currentYear })}
      </div>
    </footer>
  );
}
