"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";

export function ComparisonSection() {
  const { t } = useTranslation();
  const [isAfter, setIsAfter] = useState(false);

  return (
    <section
      id="why"
      className="py-24 md:py-32 bg-background border-b-4 border-border overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <h2 className="inline-block break-words border-4 border-border bg-main px-6 py-3 text-2xl font-black uppercase tracking-tighter text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] sm:px-8 sm:py-4 sm:text-4xl md:text-6xl">
              {t("landing.comparison.title")}
            </h2>
          </div>

          <div className="flex select-none items-center gap-2 bg-secondary-background border-4 border-border p-2 rounded-base shadow-shadow">
            <button
              onClick={() => setIsAfter(false)}
              className={`px-6 py-3 rounded-base font-black uppercase transition-all cursor-pointer ${
                !isAfter
                  ? "bg-zinc-800 text-white border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]"
                  : "text-zinc-400 hover:text-foreground"
              }`}
            >
              Chaos
            </button>
            <button
              onClick={() => setIsAfter(true)}
              className={`px-6 py-3 rounded-base font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
                isAfter
                  ? "bg-main text-main-foreground border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]"
                  : "text-zinc-400 hover:text-foreground"
              }`}
            >
              <Zap size={18} fill="currentColor" />
              Focus
            </button>
          </div>
        </div>

        <div className="relative mx-auto min-h-[500px] w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {!isAfter ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 rounded-base border-8 border-border bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-[20px_20px_0px_0px_var(--border)] overflow-hidden"
              >
                <div className="space-y-6 relative order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950 text-red-600 px-4 py-2 rounded-full border-2 border-red-200 dark:border-red-900">
                    <AlertCircle size={20} />
                    <span className="text-sm font-black uppercase">
                      {t("landing.comparison.before.title")}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tight uppercase italic text-foreground">
                    {t("landing.comparison.before.subtitle")}
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-base border-4 border-border bg-white dark:bg-[#feedcf] text-zinc-400 line-through">
                      <Zap size={24} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center relative order-1 md:order-2">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <motion.div
                    animate={{ rotate: [0, -1, 1, 0], y: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="relative w-full max-w-sm aspect-square grayscale opacity-60 flex items-center justify-center"
                  >
                    <Image
                      src="/images/user-frustrated.png"
                      alt="Frustrated"
                      width={400}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -30 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 rounded-base border-8 border-border bg-[#feedcf] p-8 md:p-12 shadow-[20px_20px_0px_0px_var(--border)] overflow-hidden"
              >
                <div className="space-y-6 relative order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 bg-main text-main-foreground px-4 py-2 rounded-full border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]">
                    <Sparkles size={20} />
                    <span className="text-sm font-black uppercase">
                      {t("landing.comparison.after.title")}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tight uppercase text-orange-950">
                    {t("landing.comparison.after.subtitle")}
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-base border-4 border-border bg-main text-main-foreground shadow-[4px_4px_0px_0px_var(--border)]">
                      <TrendingUp size={28} />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-base border-4 border-border bg-blue-400 text-white shadow-[4px_4px_0px_0px_var(--border)]">
                      <Zap size={28} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center relative order-1 md:order-2">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:15px_15px]" />
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="relative w-full max-w-sm aspect-square flex items-center justify-center drop-shadow-[20px_20px_0px_rgba(0,0,0,0.1)]"
                  >
                    <Image
                      src="/images/user-happy.png"
                      alt="Happy"
                      width={400}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating elements for "wow" factor */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -right-8 -top-8 h-24 w-24 bg-blue-400 border-4 border-border rounded-full hidden lg:flex items-center justify-center"
          >
            <Zap size={48} className="text-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
