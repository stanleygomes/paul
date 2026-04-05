"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, Brain, Lightbulb } from "lucide-react";

export function PlanWelcome() {
  const { t } = useTranslation();

  const examples = [
    {
      icon: Sparkles,
      color: "text-amber-400",
      text: t("common.components.chat.empty_state_examples.organize_week"),
    },
    {
      icon: Brain,
      color: "text-blue-400",
      text: t("common.components.chat.empty_state_examples.new_project"),
    },
    {
      icon: Lightbulb,
      color: "text-emerald-400",
      text: t("common.components.chat.empty_state_examples.morning_tasks"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4 max-w-2xl mx-auto w-full h-[60vh]">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl md:text-4xl font-black mb-4 tracking-tight dark:text-white"
      >
        {t("common.components.chat.empty_state")}
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-base md:text-lg text-muted-foreground font-medium mb-8"
      >
        {t("common.components.chat.empty_state_description")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {examples.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
              className="p-4 rounded-2xl border-2 border-black dark:border-white/10 dark:bg-white/5 text-left shadow-shadow"
            >
              <Icon className={`w-5 h-5 mb-3 ${item.color}`} />
              <div className="font-black text-[10px] uppercase tracking-widest opacity-40 mb-1">
                {t("common.components.chat.empty_state_examples.label")}
              </div>
              <div className="font-bold text-base leading-tight">
                {item.text}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
