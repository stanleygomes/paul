import { z } from "zod";

export const memorySchema = z.object({
  id: z.string(),
  content: z.string(),
  color: z.string().optional().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const createMemorySchema = memorySchema.omit({
  created_at: true,
  updated_at: true,
});

export const updateMemorySchema = memorySchema
  .omit({
    created_at: true,
  })
  .partial();

export const bulkSyncMemoriesSchema = z.object({
  memories: z.array(memorySchema),
});
