import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  createdAt: z.number().positive().optional(),
  updatedAt: z.number().positive().optional(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.number().nullable().optional(),
});

export const createProjectSchema = projectSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const updateProjectSchema = projectSchema.partial().required({
  id: true,
  updatedAt: true,
});

export const bulkSyncProjectsSchema = z.object({
  projects: z.array(projectSchema),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type BulkSyncProjectsInput = z.infer<typeof bulkSyncProjectsSchema>;
