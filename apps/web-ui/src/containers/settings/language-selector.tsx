"use client";

import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "@constants/languages";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-secondary-foreground text-xs">
          {t("settings.language.language_description")}
        </p>
      </div>
      <div className="flex gap-2">
        {LANGUAGE_OPTIONS.map((option: { value: string; label: string }) => (
          <button
            key={option.value}
            onClick={() => changeLanguage(option.value)}
            className={`rounded-base border-2 border-border px-4 py-2 text-sm font-bold transition-all ${
              i18n.language.startsWith(option.value)
                ? "bg-main text-main-foreground translate-x-[2px] translate-y-[2px] shadow-none"
                : "bg-secondary-background shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
