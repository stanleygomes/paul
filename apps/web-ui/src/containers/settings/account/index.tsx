import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { User } from "@paul/entities";
import { useUser } from "@modules/user/use-user";
import { Info } from "lucide-react";
import { toast, Input, Avatar, AvatarImage, AvatarFallback } from "@paul/ui";
import { GuestCard } from "./guest-card";
import { SettingsHeader } from "../header";
import { SettingsContainer } from "../container";
import { SimpleCard } from "src/components/simple-card";
import { Typography } from "src/components/typography";
import { Button } from "src/components/button";
import { Label } from "src/components/label";
import { Badge } from "src/components/badge";

interface UserProfileCardProps {
  user: User | null;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const { updateProfile } = useUser();
  const { t } = useTranslation();
  const [name, setName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <GuestCard />;
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error(t("settings.profile.name_empty_error"));
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({ name: name.trim() });
      toast.success(t("settings.profile.updated_success"));
    } catch (error) {
      toast.error(t("settings.profile.update_error"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const initial = (user.name || user.email)?.[0]?.toUpperCase() ?? "?";

  return (
    <SettingsContainer>
      <SettingsHeader />
      <div className="flex flex-col gap-6">
        <SimpleCard className="flex flex-col gap-6 !p-6">
          <div className="flex items-center gap-4 min-w-0">
            <Avatar className="h-20 w-20 border-4 border-border shadow-shadow">
              <AvatarImage src="" alt={user.name || user.email} />
              <AvatarFallback className="bg-main text-main-foreground text-3xl font-black">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <Badge variant="yellow" className="w-fit mb-1">
                {t("settings.profile.account_type")}
              </Badge>
              <Typography variant="large" className="font-black truncate">
                {user.email}
              </Typography>
            </div>
          </div>

          <Badge
            variant="default"
            icon={<Info size={14} />}
            className="w-fit lowercase font-bold normal-case text-foreground/60"
          >
            {t("settings.profile.email_change_warning")}
          </Badge>

          <div className="flex flex-col gap-3">
            <Label>{t("settings.profile.name_label")}</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder={t("settings.profile.name_placeholder")}
              className="h-14 text-lg font-black bg-background"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={name === user.name}
            isLoading={isLoading}
            loadingText={t("actions.saving")}
            className="w-full h-14"
          >
            {t("settings.profile.save_button")}
          </Button>
        </SimpleCard>
      </div>
    </SettingsContainer>
  );
}
