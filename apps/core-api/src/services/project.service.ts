import type { Project, CreateProjectInput } from "@paul/entities";
import { Logger } from "@paul/node-utils";
import { generateUUID } from "@paul/utils";
import type { Logger as PinoLogger } from "pino";
import { ProjectRepository } from "../repositories/project.repository.js";
import { ProjectMapper } from "../mappers/project.mapper.js";
import { BusinessError } from "../errors/BusinessError.js";

const logger: PinoLogger = Logger.getLogger();

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(
    userId: string,
    projectData: CreateProjectInput,
  ): Promise<Project> {
    const now = Date.now();
    const project: Project = {
      id: projectData.id || generateUUID(),
      name: projectData.name,
      color: projectData.color,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
      deletedAt: null,
    };

    const dbProject = ProjectMapper.toDatabase(project, userId);
    await this.projectRepository.bulkUpsert(userId, [dbProject]);

    logger.info({ userId, projectId: project.id }, "Project created");
    return project;
  }

  async update(
    userId: string,
    projectId: string,
    projectData: Partial<Project>,
  ): Promise<Project> {
    const existing = await this.projectRepository.findById(userId, projectId);
    if (!existing) {
      throw new BusinessError("Project not found");
    }

    const updated = await this.projectRepository.update(userId, projectId, {
      ...projectData,
      updated_at: new Date(),
    });

    if (!updated) {
      throw new BusinessError("Project update failed");
    }

    logger.info({ userId, projectId }, "Project updated");
    return ProjectMapper.toDomain(updated);
  }

  async get(userId: string, projectId: string): Promise<Project> {
    const project = await this.projectRepository.findById(userId, projectId);
    if (!project) {
      throw new BusinessError("Project not found");
    }
    return ProjectMapper.toDomain(project);
  }

  async list(userId: string): Promise<Project[]> {
    const projects = await this.projectRepository.findByUser(userId);
    return ProjectMapper.toDomainList(projects);
  }

  async softDelete(userId: string, projectId: string): Promise<Project> {
    const deleted = await this.projectRepository.softDelete(userId, projectId);
    if (!deleted) {
      throw new BusinessError("Project not found");
    }

    logger.info({ userId, projectId }, "Project soft deleted");
    return ProjectMapper.toDomain(deleted);
  }
}
