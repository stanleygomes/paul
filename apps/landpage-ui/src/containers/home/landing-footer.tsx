import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function LandingFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-border p-8 border-t-4 border-black">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="relative h-12 w-12 overflow-hidden rounded-base border-4 border-background bg-background shadow-[4px_4px_0px_0px_var(--border)]">
          <Image
            src="/images/logo.png"
            alt="Logo Done"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex gap-8 text-sm font-black uppercase text-background">
          <Link href="/login" className="hover:underline">
            {t("landing.menu.login")}
          </Link>
          <Link href="/privacy" className="hover:underline">
            {t("login.links.privacy")}
          </Link>
          <Link href="/terms" className="hover:underline">
            {t("login.links.terms")}
          </Link>
        </div>
        <p className="text-xs font-black text-background/60">
          {t("landing.footer.rights", { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
