import { and, eq, sql } from "drizzle-orm";
import { db } from "../config/database-client";
import { memories } from "../schemas/database/index";

export interface DbMemory {
  id: string;
  user_id: string;
  content: string;
  color: string | null;
  created_at: Date;
  updated_at: Date;
}

export type DbMemoryInsert = Omit<DbMemory, "created_at" | "updated_at"> & {
  created_at?: Date;
  updated_at?: Date;
};

export class MemoryRepository {
  async bulkUpsert(
    userId: string,
    memoriesData: DbMemoryInsert[],
  ): Promise<void> {
    if (memoriesData.length === 0) return;

    const now = new Date();
    const values = memoriesData.map((memory) => ({
      ...memory,
      user_id: userId,
      created_at: memory.created_at ?? now,
      updated_at: memory.updated_at ?? now,
    }));

    await db
      .insert(memories)
      .values(values)
      .onConflictDoUpdate({
        target: memories.id,
        set: {
          content: sql`excluded.content`,
          color: sql`excluded.color`,
          updated_at: sql`excluded.updated_at`,
        },
      });
  }

  async findByUser(userId: string): Promise<DbMemory[]> {
    const result = await db
      .select()
      .from(memories)
      .where(eq(memories.user_id, userId))
      .orderBy(sql`${memories.updated_at} DESC`);

    return result as DbMemory[];
  }

  async create(userId: string, data: DbMemoryInsert): Promise<DbMemory> {
    const now = new Date();
    const result = await db
      .insert(memories)
      .values({
        ...data,
        user_id: userId,
        created_at: data.created_at ?? now,
        updated_at: data.updated_at ?? now,
      })
      .returning();

    return result[0] as DbMemory;
  }

  async update(
    userId: string,
    memoryId: string,
    data: Partial<DbMemoryInsert>,
  ): Promise<DbMemory | null> {
    const result = await db
      .update(memories)
      .set({ ...data, updated_at: new Date() })
      .where(and(eq(memories.id, memoryId), eq(memories.user_id, userId)))
      .returning();

    return (result[0] as DbMemory) ?? null;
  }

  async delete(userId: string, memoryId: string): Promise<void> {
    await db
      .delete(memories)
      .where(and(eq(memories.id, memoryId), eq(memories.user_id, userId)));
  }
}
