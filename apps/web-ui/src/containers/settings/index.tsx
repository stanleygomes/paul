"use client";

import { useUser } from "@modules/user/use-user";
import { useTranslation } from "react-i18next";
import { UserProfileCard } from "./user-profile-card";
import { GuestCard } from "./guest-card";
import { ThemeSelector } from "./theme-selector";
import { LanguageSelector } from "./language-selector";
import { NotificationSettings } from "./notification-settings";
import { LegalSection } from "./legal-section";
import { SettingsHeader } from "./settings-header";

export default function Settings() {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-24">
        <SettingsHeader />

        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.account")}
            </h2>
            {user ? <UserProfileCard user={user} /> : <GuestCard />}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.theme")}
            </h2>
            <ThemeSelector />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.language.title")}
            </h2>
            <LanguageSelector />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.notifications")}
            </h2>
            <NotificationSettings />
          </section>

          <section className="flex flex-col gap-4">
            <LegalSection />
          </section>
        </div>
      </div>
    </main>
  );
}
