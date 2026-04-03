import { z } from "zod";

import type { Task } from "../task.js";

const baseTaskSchema = z.object({
  id: z.string().uuid(),
  content: z.string().max(500),
  title: z.string().max(500),
  done: z.boolean().default(false),
  notes: z.string().max(5000).default(""),
  important: z.boolean().default(false),
  dueDate: z.string().max(50).default(""),
  dueTime: z.string().max(20).default(""),
  url: z.string().max(2000).default(""),
  tags: z.array(z.string().max(50)).default([]),
  projectId: z.string().uuid().optional(),
  parentId: z.string().uuid().nullable().optional(),
  isDeleted: z.boolean().default(false),
  deletedAt: z.number().nullable().optional(),
});

export const taskSchema: z.ZodType<Task> = z.preprocess(
  (val: any) => {
    if (val && typeof val === "object") {
      const content = val.content || val.title || "";
      const title = val.title || val.content || "";
      return {
        ...val,
        content,
        title,
      };
    }
    return val;
  },
  baseTaskSchema.extend({
    createdAt: z
      .number()
      .positive()
      .default(() => Date.now()),
    updatedAt: z
      .number()
      .positive()
      .default(() => Date.now()),
    subtasks: z.array(z.lazy(() => taskSchema)).default([]),
  }),
) as any;

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
