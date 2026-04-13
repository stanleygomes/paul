"use client";

import { useTranslation } from "react-i18next";
import { useTheme } from "@modules/theme/use-theme";
import { IconBadge } from "@components/icon-badge";
import { SimpleCard } from "@components/simple-card";
import { Typography } from "@components/typography";
import { THEME_OPTIONS } from "../../../constants/theme-options.constant";

export function ThemeList() {
  const { t } = useTranslation();
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-4">
      {THEME_OPTIONS.map((option) => {
        const isActive = currentTheme === option.value;

        return (
          <SimpleCard key={option.value} isActive={isActive}>
            <div className="flex items-center justify-between mb-4">
              <option.icon
                className={`size-8 ${
                  isActive ? "text-main" : "text-foreground"
                }`}
              />
              {isActive && <IconBadge />}
            </div>

            <div className="flex-1">
              <Typography
                variant="large"
                as="span"
                className="uppercase tracking-tighter block"
              >
                {t(option.labelKey)}
              </Typography>
              <Typography variant="small" className="mt-1 leading-tight block">
                {t(option.descriptionKey)}
              </Typography>
            </div>

            <button
              onClick={() => setTheme(option.value)}
              disabled={isActive}
              className={`mt-6 w-fit px-6 py-2 rounded-base border-2 border-border font-black uppercase text-xs transition-all cursor-pointer ${
                isActive
                  ? "bg-main text-main-foreground shadow-none opacity-50 cursor-not-allowed"
                  : "bg-background hover:bg-main hover:text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              }`}
            >
              {isActive ? t("actions.selected") : t("actions.select")}
            </button>
          </SimpleCard>
        );
      })}
    </div>
  );
}
