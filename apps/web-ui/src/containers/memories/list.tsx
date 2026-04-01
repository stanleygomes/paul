"use client";

import { useTranslation } from "react-i18next";
import { MemoryCard } from "./memory-card";
import type { Memory } from "@paul/entities";

import { StickyNote } from "lucide-react";

interface MemoriesListProps {
  memories: Memory[];
  onEdit: (memory: Memory) => void;
  onDelete: (id: string) => void;
}

export function MemoriesList({
  memories,
  onEdit,
  onDelete,
}: MemoriesListProps) {
  const { t } = useTranslation();

  if (memories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-24 h-24 bg-pink-100 dark:bg-pink-900 border-4 border-black dark:border-white/20 rounded-full flex items-center justify-center mb-6">
          <StickyNote className="w-10 h-10 text-pink-600 dark:text-pink-400" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight italic mb-2 text-black dark:text-white">
          {t("memories.empty")}
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20 md:pb-8">
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          onEdit={() => onEdit(memory)}
          onDelete={() => onDelete(memory.id)}
        />
      ))}
    </div>
  );
}
