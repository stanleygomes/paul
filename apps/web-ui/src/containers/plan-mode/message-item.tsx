"use client";

import { motion } from "framer-motion";
import { UserAvatar } from "../../components/user-avatar";
import { Sparkles, Calendar, PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PlanMessageItemProps {
  message: {
    role: "user" | "model";
    content: string;
  };
  taskData: any;
  onCreateTask: (task: any) => void;
}

export function PlanMessageItem({
  message,
  taskData,
  onCreateTask,
}: PlanMessageItemProps) {
  const { t } = useTranslation();
  const isUser = message.role === "user";

  const displayContent =
    message.role === "model"
      ? message.content
          .replace(/```json\n[\s\S]*?\n```/g, "")
          .replace(/{[\s\S]*?"task"[\s\S]*?}/g, "")
          .trim()
      : message.content;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group flex items-start gap-4 mb-12 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <UserAvatar className="h-10 w-10 ring-4 ring-black/5 dark:ring-white/5" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black text-xs shadow-lg ring-4 ring-black/10 dark:ring-white/10">
            AI
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col gap-4 max-w-[85%] md:max-w-[70%] ${
          isUser ? "items-end text-right" : "items-start text-left"
        }`}
      >
        {/* Message Bubble */}
        <div
          className={`relative px-6 py-4 rounded-[2rem] border-2 border-black dark:border-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] ${
            isUser
              ? "bg-[#fef6d9] dark:bg-zinc-800 rounded-tr-none text-black dark:text-white"
              : "bg-white dark:bg-black rounded-tl-none text-black dark:text-white"
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed text-lg md:text-xl font-medium tracking-tight">
            {displayContent}
          </p>

          {/* Prompt Suggestion Icon (for AI) */}
          {!isUser && (
            <div className="absolute -bottom-4 -right-2 bg-amber-400 p-2 rounded-xl border-2 border-black rotate-12 group-hover:rotate-0 transition-transform shadow-md">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
          )}
        </div>

        {/* Task Extraction UI */}
        {taskData && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full mt-4 p-6 rounded-3xl bg-[#efefef] dark:bg-zinc-900 border-2 border-dashed border-black dark:border-white/30 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-black dark:bg-white rounded-2xl">
                <PlusCircle className="w-6 h-6 text-white dark:text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  New Task Concept
                </span>
                <h4 className="text-xl md:text-2xl font-black">
                  {taskData.title}
                </h4>
              </div>
            </div>

            {taskData.description && (
              <p className="text-muted-foreground italic text-lg leading-relaxed px-1">
                {taskData.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {taskData.dueDate && (
                <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-black border-2 border-black dark:border-white/20 rounded-full text-xs font-bold shadow-sm">
                  <Calendar className="w-4 h-4" />
                  {taskData.dueDate}
                </div>
              )}
            </div>

            <button
              onClick={() => onCreateTask(taskData)}
              className="mt-2 w-full py-5 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]"
            >
              {t("common.components.chat.create_task")}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
