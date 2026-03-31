import { z } from "zod";

import type { Task } from "../task.js";

const baseTaskSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).max(500),
  done: z.boolean(),
  notes: z.string().max(5000),
  important: z.boolean(),
  dueDate: z.string().max(50),
  dueTime: z.string().max(20),
  url: z.string().max(2000),
  tags: z.array(z.string().max(50)),
  projectId: z.string().uuid().optional(),
  parentId: z.string().uuid().nullable().optional(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.number().nullable().optional(),
});

export const taskSchema: z.ZodType<Task> = baseTaskSchema.extend({
  createdAt: z.number().positive(),
  updatedAt: z.number().positive(),
  subtasks: z.array(z.lazy(() => taskSchema)),
});

export const createTaskSchema = baseTaskSchema.extend({
  subtasks: z.array(z.lazy(() => taskSchema)).optional(),
});

export const updateTaskSchema = baseTaskSchema.partial().extend({
  id: z.string().uuid(),
  updatedAt: z.number().positive(),
  subtasks: z.array(z.lazy(() => taskSchema)).optional(),
});

export const bulkSyncTasksSchema = z.object({
  tasks: z.array(taskSchema),
});

export type TaskInput = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type BulkSyncTasksInput = z.infer<typeof bulkSyncTasksSchema>;
