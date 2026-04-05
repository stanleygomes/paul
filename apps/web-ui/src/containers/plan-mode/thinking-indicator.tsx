"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function PlanThinkingIndicator() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mt-4"
    >
      <div className="h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-lg border-2 border-black/10">
        <div className="w-2.5 h-2.5 bg-white dark:bg-black rounded-full animate-ping" />
      </div>
      <div className="px-6 py-3 rounded-[2rem] bg-white dark:bg-zinc-800 border-2 border-black dark:border-white/20 font-black italic opacity-40 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        {t("common.components.chat.thinking")}...
      </div>
    </motion.div>
  );
}
