"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AutoResizeTextarea } from "@components/auto-resize-textarea";
import { SendHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@modules/menu-layout/use-sidebar";

interface PlanInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function PlanInput({
  inputValue,
  setInputValue,
  isLoading,
  onSend,
  onKeyDown,
}: PlanInputProps) {
  const { t } = useTranslation();
  const { isOpen, mounted } = useSidebar();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  return (
    <div
      className={`fixed bottom-28 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        isOpen && mounted ? "lg:left-72" : "lg:left-0"
      }`}
    >
      <motion.div
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative group px-4 py-2 rounded-[2rem] bg-background/80 dark:bg-zinc-900/90 backdrop-blur-3xl border-2 border-black dark:border-white shadow-shadow">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 pr-1">
              <div className="flex-1">
                <AutoResizeTextarea
                  ref={textareaRef}
                  autoFocus
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setInputValue(e.target.value)
                  }
                  onKeyDown={onKeyDown}
                  placeholder={t("common.components.chat.input_placeholder")}
                  className="w-full text-base md:text-lg font-bold bg-transparent border-none p-0 focus:outline-none focus:ring-0 resize-none min-h-[24px]"
                  rows={1}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-8 h-8 rounded-full border-4 border-t-amber-400 border-black dark:border-white animate-spin opacity-50"
                    />
                  )}
                </AnimatePresence>

                <button
                  onClick={onSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-3 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all ${
                    !inputValue.trim() || isLoading
                      ? "opacity-20 scale-90"
                      : "hover:scale-110 active:scale-90 shadow-xl"
                  }`}
                >
                  <SendHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[8px] text-center mt-4 font-bold uppercase tracking-widest opacity-40 dark:text-white px-8">
          {t("common.components.chat.footer_hint")}
        </p>
      </motion.div>
    </div>
  );
}
