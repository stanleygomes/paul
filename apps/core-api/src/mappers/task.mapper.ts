import type { Task } from "@paul/entities";
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
      subtasks: [],
      tags: dbRow.tags || [],
      projectId: dbRow.project_id ?? undefined,
      parentId: dbRow.parent_id ?? undefined,
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
      tags: task.tags,
      project_id: task.projectId ?? null,
      parent_id: task.parentId ?? null,
      is_deleted: task.isDeleted ?? false,
      deleted_at: task.deletedAt ? new Date(task.deletedAt) : null,
    };
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
