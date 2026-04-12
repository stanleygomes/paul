"use client";

import { useAuth } from "@modules/auth/use-auth";
import { useUser } from "@modules/user/use-user";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "src/components/button";
import { SimpleCard } from "src/components/simple-card";
import { SyncStatusDetails } from "src/components/sync-status-details";
import { Typography } from "src/components/typography";
import { UserAvatar } from "src/components/user-avatar";
import { SettingsHeader } from "./header";
import { SettingsItems } from "./items";

export default function Settings() {
  const { user } = useUser();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-8">
        <SettingsHeader />

        <div className="flex flex-col gap-4">
          {user && (
            <SimpleCard className="!flex-row items-center gap-4 mb-6">
              <UserAvatar className="h-16 w-16" />
              <div className="flex flex-col">
                <Typography variant="h3">{user.name}</Typography>
                <Typography variant="small">{user.email}</Typography>
              </div>
            </SimpleCard>
          )}

          <SettingsItems />

          <SimpleCard>
            <Typography variant="small" className="mb-4 uppercase">
              {t("settings.sync_status")}
            </Typography>
            <SyncStatusDetails />
          </SimpleCard>

          <div className="mt-4 pt-10">
            <Button variant="danger" onClick={handleLogout} className="w-full">
              {t("settings.profile.logout")}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
