"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function EmptyState() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-20 mt-10 flex flex-col items-center px-6 py-8 text-center transition-all md:px-8 md:py-12"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <Image
          src="/images/tasks.png"
          alt={t("task_board.empty_state.title")}
          width={240}
          height={240}
          priority
          className="h-auto w-48 object-contain md:w-60"
        />
      </motion.div>
      <h3 className="text-2xl font-bold tracking-tight text-foreground">
        {t("task_board.empty_state.title")}
      </h3>
      <p className="mt-3 max-w-sm text-base font-medium opacity-70">
        {t("task_board.empty_state.body")}
      </p>
    </motion.div>
  );
}
