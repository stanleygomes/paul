"use client";

import { useTranslation } from "react-i18next";
import { Edit2, Trash2 } from "lucide-react";
import type { Memory } from "@paul/entities";
import { formatDistanceToNow } from "date-fns";
import { pt, enUS } from "date-fns/locale";

interface MemoryCardProps {
  memory: Memory;
  onEdit: () => void;
  onDelete: () => void;
}

export function MemoryCard({ memory, onEdit, onDelete }: MemoryCardProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language === "pt" ? pt : enUS;

  const isTooLong = memory.content.length > 250;
  const displayContent = isTooLong
    ? memory.content.slice(0, 250) + "..."
    : memory.content;

  return (
    <div
      className={`group relative border-4 rounded-2xl p-6 transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.05)] hover:-translate-x-1 hover:-translate-y-1 ${
        memory.color
          ? "border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black"
          : "bg-[#f9f9f9] dark:bg-[#111] border-black dark:border-white/20"
      }`}
      style={{ backgroundColor: memory.color || undefined }}
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex-1">
          <p
            className={`font-bold leading-relaxed whitespace-pre-wrap break-words ${memory.color ? "text-black" : "text-foreground/80"}`}
          >
            {displayContent}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-black/5 dark:border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
            {formatDistanceToNow(new Date(memory.updated_at), {
              addSuffix: true,
              locale,
            })}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${memory.color ? "text-black/60 hover:text-black hover:bg-black/10" : "text-foreground/40 hover:text-main hover:bg-main/10"}`}
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(i18n.t("memories.delete_confirm"))) {
                  onDelete();
                }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${memory.color ? "text-black/60 hover:text-red-600 hover:bg-red-500/10" : "text-foreground/40 hover:text-red-500 hover:bg-red-500/10"}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity ${
          memory.color
            ? "bg-black/10 border-black/10 text-black/60"
            : "bg-[#eee] dark:bg-[#222] border-black/5 dark:border-white/5 text-foreground/60"
        }`}
      >
        <span className="text-[10px] font-black">{memory.content.length}</span>
      </div>
    </div>
  );
}
