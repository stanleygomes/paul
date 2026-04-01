import type { Memory } from "@paul/entities";
import { generateUUID } from "@paul/utils";

export class MemoryManager {
  constructor(
    private readonly memories: Memory[],
    private readonly generateId: () => string = () => generateUUID(),
    private readonly now: () => number = () => Date.now(),
  ) {}

  create(content: string, color?: string): Memory[] {
    const value = content.trim();
    if (!value) {
      return this.memories;
    }

    return [
      {
        id: this.generateId(),
        content: value,
        color,
        created_at: this.now(),
        updated_at: this.now(),
      },
      ...this.memories,
    ];
  }

  update(id: string, content: string, color?: string): Memory[] {
    const value = content.trim();

    if (!value) {
      return this.memories;
    }

    return this.memories.map((memory) =>
      memory.id === id
        ? { ...memory, content: value, color, updated_at: this.now() }
        : memory,
    );
  }

  remove(id: string): Memory[] {
    return this.memories.filter((memory) => memory.id !== id);
  }
}
