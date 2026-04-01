"use client";

import { useEffect, useRef, useState } from "react";
import { usePlanning } from "@modules/planning/use-planning";
import { useTasks } from "@modules/task/use-tasks";
import { AutoResizeTextarea } from "../../components/auto-resize-textarea";
import { UserAvatar } from "../../components/user-avatar";
import { toast } from "@paul/ui";
import { useTranslation } from "react-i18next";

export default function PlanPage() {
  const { messages, isLoading, sendMessage, clearChat, isInitialLoading } =
    usePlanning();
  const { createTask } = useTasks();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const parseTaskFromResponse = (content: string) => {
    const jsonMatch =
      content.match(/```json\n([\s\S]*?)\n```/) ||
      content.match(/{[\s\S]*?"task"[\s\S]*?}/);
    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        return data.task || data;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    return null;
  };

  const handleCreateTask = (taskData: any) => {
    createTask({
      content: taskData.title,
      notes: taskData.description,
      important: taskData.important,
      dueDate: taskData.dueDate,
      dueTime: taskData.dueTime,
    });
    toast.success("Task created from plan!");
  };

  return (
    <div className="flex flex-col h-screen bg-background pt-20 md:pt-24">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-10 mx-auto w-full max-w-4xl rounded-t-3xl mt-4 border-2 border-b-0 border-black dark:border-white/10">
        <h1 className="text-2xl font-black">{t("menu.links.plan mode")}</h1>
        <button
          onClick={clearChat}
          className="px-4 py-2 rounded-full border-2 border-black dark:border-white/20 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm"
        >
          {t("common.components.chat.clear")}
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 space-y-6 mx-auto w-full max-w-4xl border-x-2 border-black dark:border-white/10 bg-secondary-background/30"
      >
        {isInitialLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground opacity-50">
            <p className="text-xl font-bold italic">
              {t("common.components.chat.empty_state")}
            </p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const taskData =
              msg.role === "model" ? parseTaskFromResponse(msg.content) : null;
            const displayContent =
              msg.role === "model"
                ? msg.content
                    .replace(/```json\n[\s\S]*?\n```/g, "")
                    .replace(/{[\s\S]*?"task"[\s\S]*?}/g, "")
                    .trim()
                : msg.content;

            return (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {msg.role === "user" ? (
                    <UserAvatar className="h-8 w-8" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black text-xs">
                      AI
                    </div>
                  )}
                </div>
                <div
                  className={`flex flex-col gap-2 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] ${
                      msg.role === "user"
                        ? "bg-[#fef6d9] dark:bg-white/10 rounded-tr-none"
                        : "bg-white dark:bg-black rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {displayContent}
                    </p>

                    {taskData && (
                      <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-2">
                        <div className="text-xs font-black uppercase opacity-50">
                          Proposed Task
                        </div>
                        <div className="font-bold text-lg">
                          {taskData.title}
                        </div>
                        {taskData.description && (
                          <div className="text-sm opacity-80 italic line-clamp-2">
                            {taskData.description}
                          </div>
                        )}
                        <button
                          onClick={() => handleCreateTask(taskData)}
                          className="mt-2 w-full py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                        >
                          {t("common.components.chat.create_task")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        {isLoading && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black text-xs animate-pulse">
              AI
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-black border-2 border-black border-dashed opacity-50 italic text-sm">
              {t("common.components.chat.thinking")}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 pb-8 border-x-2 border-b-2 border-black dark:border-white/10 rounded-b-3xl mb-8 mx-auto w-full max-w-4xl bg-background/80 backdrop-blur-md">
        <div className="flex flex-col gap-2 relative">
          <AutoResizeTextarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("common.components.chat.input_placeholder")}
            className="w-full bg-secondary-background border-2 border-black dark:border-white/20 rounded-2xl px-4 py-3 focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] resize-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`absolute right-3 bottom-3 p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all ${
              !inputValue.trim() || isLoading
                ? "opacity-20 scale-90"
                : "hover:scale-110 active:scale-90"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-center mt-4 opacity-50 font-bold uppercase tracking-wider">
          {t("common.components.chat.footer_hint")}
        </p>
      </div>
    </div>
  );
}
