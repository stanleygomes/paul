"use client";

import { useTranslation } from "react-i18next";
import { useTheme, type Theme } from "@modules/theme/use-theme";

export function ThemeSelector() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const THEME_OPTIONS: { value: Theme; label: string }[] = [
    { value: "light", label: t("settings.themes.light") },
    { value: "dark", label: t("settings.themes.dark") },
    { value: "auto", label: t("settings.themes.auto") },
  ];

  return (
    <div className="flex gap-2">
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`rounded-base border-2 border-border px-4 py-2 text-sm font-bold transition-all ${
            theme === option.value
              ? "bg-main text-main-foreground translate-x-[2px] translate-y-[2px] shadow-none"
              : "bg-secondary-background shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
