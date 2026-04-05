"use client";

import { useTranslation } from "react-i18next";

export function PlanSyncLoader() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="w-16 h-16 rounded-[2.5rem] bg-black dark:bg-white flex items-center justify-center animate-bounce shadow-2xl">
        <div className="w-6 h-6 bg-white dark:bg-black rounded-full" />
      </div>
      <p className="font-black uppercase tracking-[0.2em] opacity-40 animate-pulse text-xs">
        {t("common.components.chat.history.syncing")}
      </p>
    </div>
  );
}
