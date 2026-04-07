import { z } from "zod";

export const projectNameSchema = z
  .string()
  .trim()
  .min(1, "Project title is required")
  .max(100, "Project title is too long");

export const projectIdSchema = z.string().uuid("Invalid project id");

const projectSchema = z.object({
  id: z.string().uuid(),
  name: projectNameSchema,
  color: z.string(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.number().nullable().optional(),
});

export const createProjectPayloadSchema = z.object({
  id: z.string().uuid(),
  name: projectNameSchema,
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code"),
});

export const projectListResponseSchema = z.object({
  projects: z.array(projectSchema),
});
