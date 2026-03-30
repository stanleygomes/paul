import { z } from "zod";

export const taskSubtaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  done: z.boolean(),
});

export const taskSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).max(500),
  done: z.boolean(),
  createdAt: z.number().positive(),
  updatedAt: z.number().positive(),
  notes: z.string().max(5000),
  important: z.boolean(),
  dueDate: z.string().max(50),
  dueTime: z.string().max(20),
  url: z.string().max(2000),
  subtasks: z.array(taskSubtaskSchema),
  tags: z.array(z.string().max(50)),
  projectId: z.string().uuid().optional(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.number().nullable().optional(),
});

export const createTaskSchema = taskSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const updateTaskSchema = taskSchema.partial().required({
  id: true,
  updatedAt: true,
});

export const bulkSyncTasksSchema = z.object({
  tasks: z.array(taskSchema),
});

export type TaskInput = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type BulkSyncTasksInput = z.infer<typeof bulkSyncTasksSchema>;
