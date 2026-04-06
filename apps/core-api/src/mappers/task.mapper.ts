import type { Task } from "@paul/entities";
import type { DbTask, DbTaskInsert } from "../repositories/task.repository.js";

export class TaskMapper {
  static toDomain(dbRow: DbTask): Task {
    return {
      id: dbRow.id,
      content: dbRow.content ?? "",
      title: dbRow.title,
      done: dbRow.is_completed,
      createdAt: dbRow.created_at.getTime(),
      updatedAt: dbRow.updated_at.getTime(),
      notes: dbRow.notes ?? "",
      important: dbRow.is_important,
      dueDate: dbRow.due_date ? dbRow.due_date.toISOString() : "",
      dueTime: dbRow.due_time ?? "",
      url: dbRow.url ?? "",
      subtasks: [],
      tags: dbRow.tags || [],
      projectId: dbRow.project_id ?? undefined,
      parentId: dbRow.parent_id ?? undefined,
      isDeleted: dbRow.is_deleted,
      deletedAt: dbRow.deleted_at ? dbRow.deleted_at.getTime() : null,
      isPinned: dbRow.is_pinned,
      color: dbRow.color ?? undefined,
    };
  }

  static toDatabase(task: Task, userId: string): DbTaskInsert {
    return {
      id: task.id,
      user_id: userId,
      content: task.content,
      description: task.content, // Map content to description as well
      title: task.title,
      is_completed: task.done,
      created_at: task.createdAt ? new Date(task.createdAt) : undefined,
      updated_at: task.updatedAt ? new Date(task.updatedAt) : undefined,
      notes: task.notes,
      is_important: task.important,
      due_date: task.dueDate ? new Date(task.dueDate) : null,
      due_time: task.dueTime || null,
      url: task.url || null,
      tags: task.tags,
      project_id: task.projectId ?? null,
      parent_id: task.parentId ?? null,
      completed_at: null, // Default
      is_deleted: task.isDeleted ?? false,
      deleted_at: task.deletedAt ? new Date(task.deletedAt) : null,
      is_pinned: task.isPinned ?? false,
      color: task.color ?? null,
      zen_mode: false,
    };
  }

  static toDatabasePartial(task: Partial<Task>): Partial<DbTaskInsert> {
    const dbPartial: Partial<DbTaskInsert> = {
      id: task.id,
      content: task.content,
      description: task.content, // Sync description with content
      title: task.title,
      is_completed: task.done,
      created_at: task.createdAt ? new Date(task.createdAt) : undefined,
      updated_at: task.updatedAt ? new Date(task.updatedAt) : undefined,
      notes: task.notes,
      is_important: task.important,
      due_date:
        task.dueDate === undefined
          ? undefined
          : task.dueDate
            ? new Date(task.dueDate)
            : null,
      due_time: task.dueTime === undefined ? undefined : task.dueTime || null,
      url: task.url === undefined ? undefined : task.url || null,
      tags: task.tags,
      project_id:
        task.projectId === undefined ? undefined : (task.projectId ?? null),
      parent_id:
        task.parentId === undefined ? undefined : (task.parentId ?? null),
      is_deleted: task.isDeleted,
      deleted_at:
        task.deletedAt === undefined
          ? undefined
          : task.deletedAt
            ? new Date(task.deletedAt)
            : null,
      is_pinned: task.isPinned,
      color: task.color === undefined ? undefined : (task.color ?? null),
    };

    return Object.fromEntries(
      Object.entries(dbPartial).filter(([, value]) => value !== undefined),
    );
  }

  static toDomainList(dbRows: DbTask[]): Task[] {
    const flatTasks = dbRows.map((row) => TaskMapper.toDomain(row));
    return TaskMapper.buildTree(flatTasks);
  }

  private static buildTree(tasks: Task[]): Task[] {
    const taskMap = new Map<string, Task>();
    const roots: Task[] = [];

    // First pass: put all tasks in a map and initialize subtasks array
    for (const task of tasks) {
      task.subtasks = [];
      taskMap.set(task.id, task);
    }

    // Second pass: link subtasks to parents or add to roots
    for (const task of tasks) {
      if (task.parentId && taskMap.has(task.parentId)) {
        const parent = taskMap.get(task.parentId)!;
        parent.subtasks.push(task);
      } else {
        roots.push(task);
      }
    }

    return roots;
  }

  static toDatabaseList(tasks: Task[], userId: string): DbTaskInsert[] {
    const flatList: DbTaskInsert[] = [];

    const flatten = (t: Task) => {
      flatList.push(TaskMapper.toDatabase(t, userId));
      t.subtasks.forEach(flatten);
    };

    tasks.forEach(flatten);
    return flatList;
  }
}
