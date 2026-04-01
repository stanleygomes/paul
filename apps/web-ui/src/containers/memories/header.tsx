"use client";

import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { MemoriesSearch } from "./search";

interface MemoriesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewMemory: () => void;
}

export function MemoriesHeader({
  searchQuery,
  onSearchChange,
  onNewMemory,
}: MemoriesHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="border-b-4 border-black dark:border-white/20 p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter italic text-black dark:text-white">
          {t("memories.title")}
        </h1>
        <p className="text-sm text-foreground/60 font-bold">
          {t("memories.description")}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <MemoriesSearch value={searchQuery} onChange={onSearchChange} />

        <button
          onClick={onNewMemory}
          className="flex items-center gap-2 bg-main text-main-foreground border-2 border-black dark:border-white/20 rounded-xl px-4 py-2 text-sm font-black uppercase tracking-widest hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline">{t("memories.new")}</span>
        </button>
      </div>
    </header>
  );
}
