import { z } from "zod";

export const taskTitleSchema = z
  .string()
  .trim()
  .min(1, "Title is required")
  .max(500, "Title is too long");

export const taskContentSchema = z
  .string()
  .trim()
  .max(500, "Content is too long");

export const taskIdSchema = z.string().uuid("Invalid task id");

const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  done: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
  notes: z.string(),
  important: z.boolean(),
  dueDate: z.string(),
  dueTime: z.string(),
  url: z.string(),
  subtasks: z.array(z.unknown()),
  tags: z.array(z.string()),
  projectId: z.string().uuid().optional(),
  parentId: z.string().uuid().nullable().optional(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.number().nullable().optional(),
});

export const createTaskPayloadSchema = z.object({
  id: z.string().uuid(),
  title: taskTitleSchema,
  content: taskContentSchema,
  done: z.boolean(),
  notes: z.string(),
  important: z.boolean(),
  dueDate: z.string(),
  dueTime: z.string(),
  url: z.string(),
  subtasks: z.array(taskSchema),
  tags: z.array(z.string()),
  isDeleted: z.boolean(),
});

export const taskListResponseSchema = z.object({
  tasks: z.array(taskSchema),
});
