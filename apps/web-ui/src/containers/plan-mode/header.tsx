"use client";

import { History, MessageSquarePlus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PlanHeaderProps {
  isOpen: boolean;
  mounted: boolean;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  onNewChat: () => void;
  onClearChat: () => void;
  hasMessages: boolean;
}

export function PlanHeader({
  isOpen,
  mounted,
  isHistoryOpen,
  setIsHistoryOpen,
  onNewChat,
  onClearChat,
  hasMessages,
}: PlanHeaderProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-3xl bg-background/50 border-b-2 border-black/5 dark:border-white/5 transition-all duration-300 ${
        isOpen && mounted ? "lg:left-72" : "lg:left-0"
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-2 cursor-pointer shadow-md bg-black dark:bg-white text-white dark:text-black border-black/5 dark:border-white/5 shadow-black/10 hover:shadow-black/20 hover:scale-110 active:scale-95 ${
            isHistoryOpen ? "opacity-80" : ""
          }`}
          title={t("common.components.chat.history.button")}
        >
          <History className="w-5 h-5 md:w-6 md:h-6" />
          <span className="hidden md:inline font-black uppercase text-sm">
            {t("common.components.chat.history.button")}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 px-3 py-3 md:px-6 bg-amber-400 text-black border-2 border-black rounded-2xl font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span className="hidden md:inline">
            {t("common.components.chat.actions.new_chat")}
          </span>
        </button>

        {hasMessages && !isHistoryOpen && (
          <button
            onClick={onClearChat}
            className="p-3 bg-red-500 text-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
            title={t("common.components.chat.clear")}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
