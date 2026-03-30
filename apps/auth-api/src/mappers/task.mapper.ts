import type { Task, TaskSubtask } from "@done/entities";
import type { DbTask, DbTaskInsert } from "../repositories/task.repository.js";

export class TaskMapper {
  static toDomain(dbRow: DbTask): Task {
    return {
      id: dbRow.id,
      content: dbRow.content,
      done: dbRow.done,
      createdAt: dbRow.created_at.getTime(),
      updatedAt: dbRow.updated_at.getTime(),
      notes: dbRow.notes,
      important: dbRow.important,
      dueDate: dbRow.due_date,
      dueTime: dbRow.due_time,
      url: dbRow.url,
      subtasks: (dbRow.subtasks as TaskSubtask[]) || [],
      tags: dbRow.tags || [],
      projectId: dbRow.project_id ?? undefined,
      isDeleted: dbRow.is_deleted,
      deletedAt: dbRow.deleted_at ? dbRow.deleted_at.getTime() : null,
    };
  }

  static toDatabase(task: Task, userId: string): DbTaskInsert {
    return {
      id: task.id,
      user_id: userId,
      content: task.content,
      done: task.done,
      created_at: new Date(task.createdAt),
      updated_at: new Date(task.updatedAt),
      notes: task.notes,
      important: task.important,
      due_date: task.dueDate,
      due_time: task.dueTime,
      url: task.url,
      subtasks: task.subtasks,
      tags: task.tags,
      project_id: task.projectId ?? null,
      is_deleted: task.isDeleted ?? false,
      deleted_at: task.deletedAt ? new Date(task.deletedAt) : null,
    };
  }

  static toDomainList(dbRows: DbTask[]): Task[] {
    return dbRows.map((row) => TaskMapper.toDomain(row));
  }

  static toDatabaseList(tasks: Task[], userId: string): DbTaskInsert[] {
    return tasks.map((task) => TaskMapper.toDatabase(task, userId));
  }
}
