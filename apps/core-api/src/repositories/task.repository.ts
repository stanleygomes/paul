import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "../config/database-client.js";
import { tasks } from "../schemas/database/index.js";

export interface DbTask {
  id: string;
  user_id: string;
  project_id: string | null;
  parent_id: string | null;
  title: string;
  content: string | null;
  description: string | null;
  notes: string | null;
  is_completed: boolean;
  is_important: boolean;
  is_pinned: boolean;
  due_date: Date | null;
  due_time: string | null;
  url: string | null;
  tags: string[] | null;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  deleted_at: Date | null;
  zen_mode: boolean;
  color: string | null;
}

export type DbTaskInsert = Omit<DbTask, "created_at" | "updated_at"> & {
  created_at?: Date;
  updated_at?: Date;
};

export class TaskRepository {
  async bulkUpsert(userId: string, tasksData: DbTaskInsert[]): Promise<void> {
    if (tasksData.length === 0) return;

    const now = new Date();
    const values = tasksData.map((task) => ({
      ...task,
      user_id: userId,
      created_at: task.created_at ?? now,
      updated_at: task.updated_at ?? now,
    }));

    await db
      .insert(tasks)
      .values(values)
      .onConflictDoUpdate({
        target: tasks.id,
        set: {
          project_id: sql`excluded.project_id`,
          parent_id: sql`excluded.parent_id`,
          title: sql`excluded.title`,
          content: sql`excluded.content`,
          description: sql`excluded.description`,
          notes: sql`excluded.notes`,
          is_completed: sql`excluded.is_completed`,
          is_important: sql`excluded.is_important`,
          is_pinned: sql`excluded.is_pinned`,
          due_date: sql`excluded.due_date`,
          due_time: sql`excluded.due_time`,
          url: sql`excluded.url`,
          tags: sql`excluded.tags`,
          completed_at: sql`excluded.completed_at`,
          updated_at: sql`excluded.updated_at`,
          is_deleted: sql`excluded.is_deleted`,
          deleted_at: sql`excluded.deleted_at`,
          zen_mode: sql`excluded.zen_mode`,
          color: sql`excluded.color`,
        },
      });
  }

  async findByUser(userId: string, since?: number): Promise<DbTask[]> {
    const conditions = [eq(tasks.user_id, userId)];

    if (since) {
      conditions.push(gte(tasks.updated_at, new Date(since)));
    }

    const result = await db
      .select()
      .from(tasks)
      .where(and(...conditions));

    return result as DbTask[];
  }

  async findById(userId: string, taskId: string): Promise<DbTask | null> {
    const result = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)))
      .limit(1);

    return (result[0] as DbTask) ?? null;
  }

  async update(
    userId: string,
    taskId: string,
    data: Partial<DbTaskInsert>,
  ): Promise<DbTask | null> {
    const [result] = await db
      .update(tasks)
      .set({ ...data, updated_at: new Date() })
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)))
      .returning();

    return (result as DbTask) ?? null;
  }

  async softDelete(userId: string, taskId: string): Promise<DbTask | null> {
    const now = new Date();
    const [result] = await db
      .update(tasks)
      .set({
        is_deleted: true,
        deleted_at: now,
        updated_at: now,
      })
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)))
      .returning();

    return (result as DbTask) ?? null;
  }

  async hardDelete(userId: string, taskId: string): Promise<void> {
    await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)));
  }
}
