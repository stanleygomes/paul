"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function LandingMenu() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b-4 border-border bg-background/80 backdrop-blur-md px-6 h-20 flex items-center shadow-sm">
      <div className="mx-auto max-w-7xl w-full flex justify-between items-center">
        <Link
          href="/landing"
          className="flex items-center gap-2 group hover:no-underline"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-main text-lg font-black text-main-foreground italic shadow-[2px_2px_0px_0px_var(--border)] transition-transform group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] group-hover:shadow-[4px_4px_0px_0px_var(--border)]">
            D.
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-foreground">
            Done.
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-wider">
          <a
            href="#why"
            className="text-foreground/60 hover:text-foreground hover:no-underline transition-colors"
          >
            {t("landing.menu.comparison")}
          </a>
          <a
            href="#app"
            className="text-foreground/60 hover:text-foreground hover:no-underline transition-colors"
          >
            {t("landing.menu.preview")}
          </a>
          <a
            href="#features"
            className="text-foreground/60 hover:text-foreground hover:no-underline transition-colors"
          >
            {t("landing.menu.features")}
          </a>
          <a
            href="#testimonials"
            className="text-foreground/60 hover:text-foreground hover:no-underline transition-colors"
          >
            {t("landing.menu.testimonials")}
          </a>
          {/* <a
            href="#pricing"
            className="text-foreground/60 hover:text-foreground hover:no-underline transition-colors"
          >
            {t("landing.menu.pricing")}
          </a> */}
          <Link
            href="/"
            className="flex h-11 items-center justify-center rounded-base border-2 border-border bg-main px-6 text-xs font-black uppercase text-main-foreground shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:no-underline active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            {t("landing.menu.login")}
          </Link>
        </div>

        <div className="md:hidden">
          <Link
            href="/login"
            className="flex h-10 items-center justify-center rounded-base border-2 border-border bg-main px-4 text-xs font-black uppercase text-main-foreground shadow-[4px_4px_0px_0px_var(--border)] hover:no-underline"
          >
            {t("landing.menu.login")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
