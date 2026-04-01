"use client";

import { useTranslation } from "react-i18next";
import { Search as SearchIcon } from "lucide-react";

interface MemoriesSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MemoriesSearch({ value, onChange }: MemoriesSearchProps) {
  const { t } = useTranslation();

  return (
    <div className="relative flex-1 md:w-64 group">
      <SearchIcon
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${value ? "text-main" : "text-foreground/40"}`}
      />
      <input
        type="text"
        placeholder={t("task_board.search.placeholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#f0f0f0] dark:bg-[#222] border-2 border-black dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main transition-all text-black dark:text-white"
      />
    </div>
  );
}
