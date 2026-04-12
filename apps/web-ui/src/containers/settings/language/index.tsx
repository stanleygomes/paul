"use client";

import { useTranslation } from "react-i18next";
import { Typography } from "src/components/typography";
import { SettingsHeader } from "../header";
import { SettingsContainer } from "../container";
import { LanguageList } from "./language-list";

export function LanguageSelector() {
  const { t } = useTranslation();

  return (
    <SettingsContainer>
      <SettingsHeader />

      <div className="mb-8">
        <Typography variant="h2">{t("settings.language.title")}</Typography>
        <Typography variant="p" className="font-bold">
          {t("settings.language.language_description")}
        </Typography>
      </div>

      <LanguageList />
    </SettingsContainer>
  );
}
