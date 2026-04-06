import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "../config/database-client";
import { tasks } from "../schemas/database/index";

export interface DbTask {
  id: string;
  user_id: string;
  project_id: string | null;
  parent_id: string | null;
  content: string;
  title: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  notes: string;
  important: boolean;
  due_date: string;
  due_time: string;
  url: string;
  tags: string[];
  is_deleted: boolean;
  deleted_at: Date | null;
  is_pinned: boolean;
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
          content: sql`excluded.content`,
          title: sql`excluded.title`,
          done: sql`excluded.done`,
          updated_at: sql`excluded.updated_at`,
          notes: sql`excluded.notes`,
          important: sql`excluded.important`,
          due_date: sql`excluded.due_date`,
          due_time: sql`excluded.due_time`,
          url: sql`excluded.url`,
          tags: sql`excluded.tags`,
          is_deleted: sql`excluded.is_deleted`,
          deleted_at: sql`excluded.deleted_at`,
          is_pinned: sql`excluded.is_pinned`,
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
