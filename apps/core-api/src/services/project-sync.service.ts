import type { Project } from "@paul/entities";
import {
  ProjectRepository,
  type DbProject,
} from "../repositories/project.repository.js";
import { ProjectMapper } from "../mappers/project.mapper.js";

export class ProjectSyncService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async sync(userId: string, clientProjects: Project[]): Promise<Project[]> {
    const serverProjects = await this.projectRepository.findByUser(userId);
    const serverProjectsMap = new Map(serverProjects.map((p) => [p.id, p]));
    const clientProjectsMap = new Map(clientProjects.map((p) => [p.id, p]));

    const { projectsToUpsert, projectsToReturn } = this.compareAndCollect(
      clientProjects,
      serverProjectsMap,
    );

    const missingFromServer = this.getMissingFromServer(
      serverProjects,
      clientProjectsMap,
    );
    projectsToReturn.push(...missingFromServer);

    await this.persistUpserts(userId, projectsToUpsert);

    return projectsToReturn;
  }

  private compareAndCollect(
    clientProjects: Project[],
    serverProjectsMap: Map<string, DbProject>,
  ): { projectsToUpsert: Project[]; projectsToReturn: Project[] } {
    const projectsToUpsert: Project[] = [];
    const projectsToReturn: Project[] = [];

    for (const clientProject of clientProjects) {
      const serverProject = serverProjectsMap.get(clientProject.id);
      const resolution = this.resolveConflict(clientProject, serverProject);

      if (resolution.toUpsert) projectsToUpsert.push(resolution.toUpsert);
      if (resolution.toReturn) projectsToReturn.push(resolution.toReturn);
    }

    return { projectsToUpsert, projectsToReturn };
  }

  private resolveConflict(
    clientProject: Project,
    serverProject?: DbProject,
  ): { toUpsert?: Project; toReturn?: Project } {
    if (!serverProject) {
      return { toUpsert: clientProject };
    }

    if (this.isClientProjectMoreRecent(clientProject, serverProject)) {
      return { toUpsert: clientProject };
    }

    if (this.isServerProjectMoreRecent(clientProject, serverProject)) {
      return { toReturn: ProjectMapper.toDomain(serverProject) };
    }

    return {};
  }

  private isClientProjectMoreRecent(
    clientProject: Project,
    serverProject: DbProject,
  ): boolean {
    const clientUpdatedAt = clientProject.updatedAt || 0;
    const serverUpdatedAt = serverProject.updated_at.getTime();
    return clientUpdatedAt > serverUpdatedAt;
  }

  private isServerProjectMoreRecent(
    clientProject: Project,
    serverProject: DbProject,
  ): boolean {
    const clientUpdatedAt = clientProject.updatedAt || 0;
    const serverUpdatedAt = serverProject.updated_at.getTime();
    return serverUpdatedAt > clientUpdatedAt;
  }

  private getMissingFromServer(
    serverProjects: DbProject[],
    clientProjectsMap: Map<string, Project>,
  ): Project[] {
    const missing: Project[] = [];
    for (const serverProject of serverProjects) {
      if (!clientProjectsMap.has(serverProject.id)) {
        missing.push(ProjectMapper.toDomain(serverProject));
      }
    }
    return missing;
  }

  private async persistUpserts(
    userId: string,
    projects: Project[],
  ): Promise<void> {
    if (projects.length === 0) return;
    const dbProjects = ProjectMapper.toDatabaseList(projects, userId);
    await this.projectRepository.bulkUpsert(userId, dbProjects);
  }
}
