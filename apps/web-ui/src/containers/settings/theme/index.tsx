"use client";

import { useTranslation } from "react-i18next";
import { useTheme, type Theme } from "@modules/theme/use-theme";
import { SettingsMain } from "../settings-main";
import { SettingsHeader } from "../settings-header";
import { Monitor, Moon, Sun, Snowflake, LucideIcon } from "lucide-react";
import { Typography } from "../../../components/typography";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: LucideIcon;
  description: string;
}

export function ThemeSelector() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const THEME_OPTIONS: ThemeOption[] = [
    {
      value: "classic",
      label: t("settings.themes.classic"),
      icon: Sun,
      description: t("settings.themes.classic_description"),
    },
    {
      value: "ice",
      label: t("settings.themes.ice"),
      icon: Snowflake,
      description: t("settings.themes.ice_description"),
    },
    {
      value: "dark",
      label: t("settings.themes.dark"),
      icon: Moon,
      description: t("settings.themes.dark_description"),
    },
    {
      value: "auto",
      label: t("settings.themes.auto"),
      icon: Monitor,
      description: t("settings.themes.auto_description"),
    },
  ];

  return (
    <SettingsMain>
      <SettingsHeader />

      <div className="mb-8">
        <Typography variant="h2">{t("settings.theme_page.title")}</Typography>
        <Typography variant="p" className="font-bold">
          {t("settings.theme_page.subtitle")}
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {THEME_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 border-border transition-all cursor-pointer group ${
              theme === option.value
                ? "bg-main text-main-foreground shadow-none translate-x-[4px] translate-y-[4px]"
                : "bg-secondary-background hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-none"
            }`}
          >
            <option.icon
              className={`size-10 mb-4 transition-transform group-hover:scale-110 ${
                theme === option.value
                  ? "text-main-foreground"
                  : "text-foreground/40"
              }`}
            />
            <Typography
              variant="large"
              as="span"
              className="uppercase tracking-tighter"
            >
              {option.label}
            </Typography>
            <Typography variant="small" as="span" className="mt-1 text-center">
              {option.description}
            </Typography>
          </button>
        ))}
      </div>
    </SettingsMain>
  );
}
