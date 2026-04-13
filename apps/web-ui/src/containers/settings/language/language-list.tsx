"use client";

import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "@constants/languages.constant";
import { SimpleCard } from "@components/simple-card";
import { Typography } from "@components/typography";
import { IconBadge } from "@components/icon-badge";
import { Languages } from "lucide-react";

export function LanguageList() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = currentLanguage.startsWith(option.value);

        return (
          <SimpleCard key={option.value} isActive={isActive}>
            <div className="flex items-center justify-between mb-4">
              <Languages
                className={`size-8 ${
                  isActive ? "text-main" : "text-foreground"
                }`}
              />
              {isActive && <IconBadge />}
            </div>

            <div className="flex-1">
              <Typography
                variant="large"
                className="uppercase tracking-tighter block font-black"
              >
                {option.label}
              </Typography>
              <Typography variant="small" className="mt-1 leading-tight block">
                {isActive
                  ? t("settings.language.active_language")
                  : t("settings.language.switch_to_language", {
                      lang: option.label,
                    })}
              </Typography>
            </div>

            <button
              onClick={() => handleLanguageChange(option.value)}
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
