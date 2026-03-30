import { and, eq } from "drizzle-orm";
import { db } from "../config/database-client.js";
import { projects } from "../schemas/database/index.js";

export interface DbProject {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  deleted_at: Date | null;
}

export type DbProjectInsert = Omit<DbProject, "created_at" | "updated_at"> & {
  created_at?: Date;
  updated_at?: Date;
};

export class ProjectRepository {
  async bulkUpsert(
    userId: string,
    projectsData: DbProjectInsert[],
  ): Promise<void> {
    if (projectsData.length === 0) return;

    for (const project of projectsData) {
      const now = new Date();
      await db
        .insert(projects)
        .values({
          ...project,
          user_id: userId,
          created_at: project.created_at ?? now,
          updated_at: project.updated_at ?? now,
        })
        .onConflictDoUpdate({
          target: projects.id,
          set: {
            name: project.name,
            color: project.color,
            updated_at: project.updated_at,
            is_deleted: project.is_deleted,
            deleted_at: project.deleted_at,
          },
        });
    }
  }

  async findByUser(userId: string): Promise<DbProject[]> {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.user_id, userId));

    return result;
  }

  async findById(userId: string, projectId: string): Promise<DbProject | null> {
    const result = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    return result[0] ?? null;
  }

  async update(
    userId: string,
    projectId: string,
    data: Partial<DbProjectInsert>,
  ): Promise<DbProject | null> {
    const result = await db
      .update(projects)
      .set({ ...data, updated_at: new Date() })
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .returning();

    return result[0] ?? null;
  }

  async softDelete(
    userId: string,
    projectId: string,
  ): Promise<DbProject | null> {
    const now = new Date();
    const result = await db
      .update(projects)
      .set({
        is_deleted: true,
        deleted_at: now,
        updated_at: now,
      })
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .returning();

    return result[0] ?? null;
  }
}
