"use client";

import { useTranslation } from "react-i18next";
import { Typography } from "../../components/typography";
import { BackButton } from "../../components/back-button";

export function SettingsHeader() {
  const { t } = useTranslation();

  return (
    <>
      <BackButton />
      <Typography variant="h1" className="mb-8">
        {t("settings.title")}
      </Typography>
    </>
  );
}
