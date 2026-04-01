"use client";

import { useTranslation } from "react-i18next";
import { MemoriesHeader } from "./header";
import { MemoriesList } from "./list";
import { useMemories } from "@modules/memory/use-memories";
import { useState } from "react";
import { MemoryFormDrawer } from "./form-drawer";
import type { Memory } from "@paul/entities";

export default function MemoriesContainer() {
  const { t } = useTranslation();
  const {
    memories,
    createMemory,
    updateMemory,
    deleteMemory,
    searchQuery,
    setSearchQuery,
  } = useMemories();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCreate = (content: string, color?: string) => {
    createMemory(content, color);
    setIsDrawerOpen(false);
  };

  const handleUpdate = (content: string, color?: string) => {
    if (selectedMemory) {
      updateMemory(selectedMemory.id, content, color);
      setSelectedMemory(null);
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full mt-20">
      <MemoriesHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewMemory={() => {
          setSelectedMemory(null);
          setIsDrawerOpen(true);
        }}
      />

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <MemoriesList
          memories={memories}
          onEdit={(memory: Memory) => {
            setSelectedMemory(memory);
            setIsDrawerOpen(true);
          }}
          onDelete={deleteMemory}
        />
      </div>

      <MemoryFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={selectedMemory ? handleUpdate : handleCreate}
        initialContent={selectedMemory?.content || ""}
        initialColor={selectedMemory?.color || undefined}
        title={selectedMemory ? t("memories.edit") : t("memories.new")}
        memoryId={selectedMemory?.id || "new"}
      />
    </div>
  );
}
