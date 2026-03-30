import { and, eq, gte } from "drizzle-orm";
import { db } from "../config/database-client.js";
import { tasks } from "../schemas/database/index.js";

export interface DbTask {
  id: string;
  user_id: string;
  content: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  notes: string;
  important: boolean;
  due_date: string;
  due_time: string;
  url: string;
  subtasks: unknown;
  tags: string[];
  project_id: string | null;
  is_deleted: boolean;
  deleted_at: Date | null;
}

export type DbTaskInsert = Omit<DbTask, "created_at" | "updated_at"> & {
  created_at?: Date;
  updated_at?: Date;
};

export class TaskRepository {
  async bulkUpsert(userId: string, tasksData: DbTaskInsert[]): Promise<void> {
    if (tasksData.length === 0) return;

    for (const task of tasksData) {
      const now = new Date();
      await db
        .insert(tasks)
        .values({
          ...task,
          user_id: userId,
          created_at: task.created_at ?? now,
          updated_at: task.updated_at ?? now,
        })
        .onConflictDoUpdate({
          target: tasks.id,
          set: {
            content: task.content,
            done: task.done,
            updated_at: task.updated_at,
            notes: task.notes,
            important: task.important,
            due_date: task.due_date,
            due_time: task.due_time,
            url: task.url,
            subtasks: task.subtasks,
            tags: task.tags,
            project_id: task.project_id,
            is_deleted: task.is_deleted,
            deleted_at: task.deleted_at,
          },
        });
    }
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

    return result;
  }

  async findById(userId: string, taskId: string): Promise<DbTask | null> {
    const result = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)))
      .limit(1);

    return result[0] ?? null;
  }

  async update(
    userId: string,
    taskId: string,
    data: Partial<DbTaskInsert>,
  ): Promise<DbTask | null> {
    const result = await db
      .update(tasks)
      .set({ ...data, updated_at: new Date() })
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)))
      .returning();

    return result[0] ?? null;
  }

  async softDelete(userId: string, taskId: string): Promise<DbTask | null> {
    const now = new Date();
    const result = await db
      .update(tasks)
      .set({
        is_deleted: true,
        deleted_at: now,
        updated_at: now,
      })
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)))
      .returning();

    return result[0] ?? null;
  }

  async hardDelete(userId: string, taskId: string): Promise<void> {
    await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.user_id, userId)));
  }
}
