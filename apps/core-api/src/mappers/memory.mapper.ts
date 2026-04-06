import type { Memory } from "@paul/entities";
import type {
  DbMemory,
  DbMemoryInsert,
} from "../repositories/memory.repository";

export class MemoryMapper {
  static toDomain(dbRow: DbMemory): Memory {
    return {
      id: dbRow.id,
      content: dbRow.content,
      color: dbRow.color ?? undefined,
      created_at: dbRow.created_at.getTime(),
      updated_at: dbRow.updated_at.getTime(),
    };
  }

  static toDatabase(memory: Memory, userId: string): DbMemoryInsert {
    return {
      id: memory.id,
      user_id: userId,
      content: memory.content,
      color: memory.color ?? null,
      created_at: memory.created_at ? new Date(memory.created_at) : undefined,
      updated_at: memory.updated_at ? new Date(memory.updated_at) : undefined,
    };
  }

  static toDatabasePartial(memory: Partial<Memory>): Partial<DbMemoryInsert> {
    const dbPartial: Partial<DbMemoryInsert> = {
      id: memory.id,
      content: memory.content,
      color: memory.color === undefined ? undefined : (memory.color ?? null),
      created_at: memory.created_at ? new Date(memory.created_at) : undefined,
      updated_at: memory.updated_at ? new Date(memory.updated_at) : undefined,
    };

    return Object.fromEntries(
      Object.entries(dbPartial).filter(([, value]) => value !== undefined),
    );
  }

  static toDomainList(dbRows: DbMemory[]): Memory[] {
    return dbRows.map((row) => MemoryMapper.toDomain(row));
  }

  static toDatabaseList(memories: Memory[], userId: string): DbMemoryInsert[] {
    return memories.map((memory) => MemoryMapper.toDatabase(memory, userId));
  }
}
