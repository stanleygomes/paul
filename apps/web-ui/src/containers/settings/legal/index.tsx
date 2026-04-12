"use client";

import { LEGAL_MENU_ITEMS } from "@constants/settings-menu";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ListItem } from "src/components/list-item";
import { Typography } from "src/components/typography";
import { SettingsContainer } from "../container";
import { SettingsHeader } from "../header";

export function LegalSection() {
  const { t } = useTranslation();

  return (
    <SettingsContainer>
      <SettingsHeader />

      <div className="flex flex-col gap-4">
        <Typography variant="h3" className="uppercase">
          {t("settings.legal.title")}
        </Typography>

        {LEGAL_MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block no-underline active:scale-95 transition-transform"
          >
            <ListItem
              title={t(item.titleKey)}
              description={t(item.descKey)}
              isHoverable
              className="!p-6"
            />
          </Link>
        ))}
      </div>
    </SettingsContainer>
  );
}
