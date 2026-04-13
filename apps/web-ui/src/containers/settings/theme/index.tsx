"use client";

import { useTranslation } from "react-i18next";
import { Typography } from "@components/typography";
import { SettingsHeader } from "../header";
import { SettingsContainer } from "../container";
import { ThemeList } from "./theme-list";

export function ThemeSelector() {
  const { t } = useTranslation();

  return (
    <SettingsContainer>
      <SettingsHeader />

      <div className="mb-8">
        <Typography variant="h2">{t("settings.theme_page.title")}</Typography>
        <Typography variant="p" className="font-bold">
          {t("settings.theme_page.subtitle")}
        </Typography>
      </div>

      <ThemeList />
    </SettingsContainer>
  );
}
