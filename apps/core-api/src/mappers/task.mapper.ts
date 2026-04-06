import type { Task } from "@paul/entities";
import type { DbTask, DbTaskInsert } from "../repositories/task.repository.js";

export class TaskMapper {
  static toDomain(dbRow: DbTask): Task {
    return {
      id: dbRow.id,
      content: dbRow.content ?? "",
      title: dbRow.title || dbRow.content || "",
      done: dbRow.done,
      createdAt: dbRow.created_at.getTime(),
      updatedAt: dbRow.updated_at.getTime(),
      notes: dbRow.notes ?? "",
      important: dbRow.important,
      dueDate: dbRow.due_date ?? "",
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
      content: task.content || "",
      title: task.title || "",
      done: task.done,
      created_at: task.createdAt ? new Date(task.createdAt) : undefined,
      updated_at: task.updatedAt ? new Date(task.updatedAt) : undefined,
      notes: task.notes || "",
      important: task.important,
      due_date: task.dueDate || "",
      due_time: task.dueTime || "",
      url: task.url || "",
      tags: task.tags || [],
      project_id: task.projectId ?? null,
      parent_id: task.parentId ?? null,
      is_deleted: task.isDeleted ?? false,
      deleted_at: task.deletedAt ? new Date(task.deletedAt) : null,
      is_pinned: task.isPinned ?? false,
      color: task.color ?? null,
    };
  }

  static toDatabasePartial(task: Partial<Task>): Partial<DbTaskInsert> {
    const dbPartial: any = {};
    if (task.id !== undefined) dbPartial.id = task.id;
    if (task.content !== undefined) dbPartial.content = task.content;
    if (task.title !== undefined) dbPartial.title = task.title;
    if (task.done !== undefined) dbPartial.done = task.done;
    if (task.createdAt !== undefined)
      dbPartial.created_at = new Date(task.createdAt);
    if (task.updatedAt !== undefined)
      dbPartial.updated_at = new Date(task.updatedAt);
    if (task.notes !== undefined) dbPartial.notes = task.notes;
    if (task.important !== undefined) dbPartial.important = task.important;
    if (task.dueDate !== undefined) dbPartial.due_date = task.dueDate;
    if (task.dueTime !== undefined) dbPartial.due_time = task.dueTime;
    if (task.url !== undefined) dbPartial.url = task.url;
    if (task.tags !== undefined) dbPartial.tags = task.tags;
    if (task.projectId !== undefined)
      dbPartial.project_id = task.projectId ?? null;
    if (task.parentId !== undefined)
      dbPartial.parent_id = task.parentId ?? null;
    if (task.isDeleted !== undefined) dbPartial.is_deleted = task.isDeleted;
    if (task.deletedAt !== undefined)
      dbPartial.deleted_at = task.deletedAt ? new Date(task.deletedAt) : null;
    if (task.isPinned !== undefined) dbPartial.is_pinned = task.isPinned;
    if (task.color !== undefined) dbPartial.color = task.color ?? null;

    return dbPartial;
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
