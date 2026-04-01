"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { MemoryManager } from "./memory-manager";
import type { Memory } from "@paul/entities";
import { useSync } from "../sync/use-sync";

export function useMemories() {
  const [memories, setMemories] = useLocalStorage<Memory[]>(
    "todo-memories",
    [],
  );
  const { isSyncing, performSync } = useSync();
  const [searchQuery, setSearchQuery] = useState("");

  const manager = useMemo(() => new MemoryManager(memories), [memories]);

  const filteredMemories = useMemo(() => {
    if (!searchQuery) return memories;
    return memories.filter((m) =>
      m.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [memories, searchQuery]);

  function createMemory(content: string, color?: string) {
    setMemories(manager.create(content, color));
    setTimeout(performSync, 1000);
  }

  function updateMemory(id: string, content: string, color?: string) {
    setMemories(manager.update(id, content, color));
    setTimeout(performSync, 1000);
  }

  function deleteMemory(id: string) {
    setMemories(manager.remove(id));
    setTimeout(performSync, 1000);
  }

  return {
    memories: filteredMemories,
    isSyncing,
    searchQuery,
    setSearchQuery,
    createMemory,
    updateMemory,
    deleteMemory,
    performSync,
  };
}
