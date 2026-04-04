"use client";

import Link from "next/link";
import { ListTodo, LayoutGrid, Wand2, Brain } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface MobileNavbarProps {
  pathname: string;
}

export function MobileNavbar({ pathname }: MobileNavbarProps) {
  const { t } = useTranslation();

  const items = [
    { href: "/", label: t("menu.links.tasks"), icon: ListTodo },
    { href: "/projects", label: t("menu.links.projects"), icon: LayoutGrid },
    { href: "/plan", label: t("menu.links.plan mode"), icon: Wand2 },
    { href: "/memories", label: t("menu.links.memories"), icon: Brain },
  ];

  return (
    <nav className="relative flex items-center gap-1 sm:gap-4 px-1 py-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors no-underline min-w-[56px] ${
              isActive
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/70"
            } active:scale-95 active:translate-y-0.5`}
          >
            {isActive && (
              <motion.div
                layoutId="active-nav-pill"
                className="absolute inset-0 bg-[#fef6d9] dark:bg-white/10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <Icon size={22} strokeWidth={isActive ? 3 : 2} />
              <span
                className={`text-[8px] font-black uppercase tracking-widest text-center ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
