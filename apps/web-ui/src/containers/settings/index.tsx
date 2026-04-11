"use client";

import { useUser } from "@modules/user/use-user";
import { useTranslation } from "react-i18next";
import { SettingsHeader } from "./settings-header";
import {
  User,
  Palette,
  Languages,
  Bell,
  Timer,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "src/components/user-avatar";

export default function Settings() {
  const { user } = useUser();
  const { t } = useTranslation();

  const menuItems = [
    {
      href: "/settings/account",
      label: t("settings.account"),
      icon: User,
      color: "bg-blue-500",
      description: user?.email,
    },
    {
      href: "/settings/theme",
      label: t("settings.theme"),
      icon: Palette,
      color: "bg-purple-500",
    },
    {
      href: "/settings/language",
      label: t("settings.language.title"),
      icon: Languages,
      color: "bg-green-500",
    },
    {
      href: "/settings/notifications",
      label: t("settings.notifications"),
      icon: Bell,
      color: "bg-red-500",
    },
    {
      href: "/settings/pomodoro",
      label: t("settings.pomodoro.title"),
      icon: Timer,
      color: "bg-orange-500",
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-8">
        <SettingsHeader />

        <div className="flex flex-col gap-4">
          {user && (
            <div className="mb-6 bg-secondary-background border-2 border-border rounded-xl p-6 flex items-center gap-4 shadow-shadow">
              <UserAvatar className="h-16 w-16" />
              <div className="flex flex-col">
                <span className="text-xl font-black">{user.name}</span>
                <span className="text-sm text-foreground/50">{user.email}</span>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between bg-secondary-background border-2 border-border rounded-xl p-4 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-shadow active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-base border-2 border-border ${item.color} text-white shadow-[2px_2px_0px_0px_var(--border)]`}
                  >
                    <item.icon size={24} strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black uppercase tracking-tight">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="text-xs font-bold text-foreground/40">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="text-foreground/40 group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t-2 border-border/50">
            <Link
              href="/settings/legal"
              className="group flex items-center justify-between p-4 rounded-xl hover:bg-secondary-background transition-colors"
            >
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-foreground/40" />
                <span className="font-bold text-foreground/60 group-hover:text-foreground">
                  {t("settings.legal.title")}
                </span>
              </div>
              <ChevronRight
                size={20}
                className="text-foreground/20 group-hover:text-foreground"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
