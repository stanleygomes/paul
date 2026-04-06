import type { Project } from "@paul/entities";
import type {
  DbProject,
  DbProjectInsert,
} from "../repositories/project.repository.js";

export class ProjectMapper {
  static toDomain(dbRow: DbProject): Project {
    return {
      id: dbRow.id,
      name: dbRow.name,
      color: dbRow.color,
      createdAt: dbRow.created_at.getTime(),
      updatedAt: dbRow.updated_at.getTime(),
      isDeleted: dbRow.is_deleted,
      deletedAt: dbRow.deleted_at ? dbRow.deleted_at.getTime() : null,
    };
  }

  static toDatabase(project: Project, userId: string): DbProjectInsert {
    return {
      id: project.id,
      user_id: userId,
      name: project.name,
      color: project.color,
      created_at: project.createdAt ? new Date(project.createdAt) : new Date(),
      updated_at: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      is_deleted: project.isDeleted ?? false,
      deleted_at: project.deletedAt ? new Date(project.deletedAt) : null,
    };
  }

  static toDatabasePartial(
    project: Partial<Project>,
  ): Partial<DbProjectInsert> {
    const dbPartial: Partial<DbProjectInsert> = {
      id: project.id,
      name: project.name,
      color: project.color,
      created_at: project.createdAt ? new Date(project.createdAt) : undefined,
      updated_at: project.updatedAt ? new Date(project.updatedAt) : undefined,
      is_deleted: project.isDeleted,
      deleted_at:
        project.deletedAt === undefined
          ? undefined
          : project.deletedAt
            ? new Date(project.deletedAt)
            : null,
    };

    return Object.fromEntries(
      Object.entries(dbPartial).filter(([, value]) => value !== undefined),
    );
  }

  static toDomainList(dbRows: DbProject[]): Project[] {
    return dbRows.map((row) => ProjectMapper.toDomain(row));
  }

  static toDatabaseList(
    projects: Project[],
    userId: string,
  ): DbProjectInsert[] {
    return projects.map((project) => ProjectMapper.toDatabase(project, userId));
  }
}
