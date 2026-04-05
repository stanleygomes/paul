"use client";

import { motion } from "framer-motion";
import { MessageSquare, Trash2, Clock, Brain } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PlanHistoryProps {
  conversations: Array<{ id: string; title: string; date: string }>;
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
}

export function PlanHistory({
  conversations,
  currentConversationId,
  onSelectConversation,
}: PlanHistoryProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-2xl border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            <Brain className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              {t("common.components.chat.history.title")}
            </h2>
            <p className="text-xs font-black uppercase opacity-40 tracking-widest">
              {conversations.length}{" "}
              {t("common.components.chat.history.recently")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conversations.length === 0 ? (
          <div className="col-span-full py-32 text-center border-4 border-dashed border-black/5 dark:border-white/5 rounded-[3rem]">
            <p className="opacity-30 italic text-lg font-bold">
              {t("common.components.chat.history.no_sessions")}
            </p>
          </div>
        ) : (
          conversations.map((conv) => (
            <motion.button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left p-6 cursor-pointer rounded-[2rem] border-2 transition-all flex items-start gap-4 group relative ${
                currentConversationId === conv.id
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white dark:bg-zinc-900 border-black dark:border-white/20 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)]"
              }`}
            >
              <div
                className={`p-3 rounded-2xl border-2 flex-shrink-0 ${
                  currentConversationId === conv.id
                    ? "bg-white/20 border-white/40"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
              </div>

              <div className="flex flex-col min-w-0 pr-10">
                <span className="font-black text-lg truncate leading-tight">
                  {conv.title}
                </span>
                <div className="flex items-center gap-2 opacity-40 mt-2">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] uppercase font-black tracking-widest">
                    {conv.date}
                  </span>
                </div>
              </div>

              <button className="absolute right-6 top-6 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white rounded-xl transition-all border-2 border-transparent hover:border-black">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}
