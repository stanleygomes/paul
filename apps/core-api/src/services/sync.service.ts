import type { Project, Task } from "@done/entities";
import { Logger } from "@done/node-utils";
import type { Logger as PinoLogger } from "pino";
import { TaskRepository } from "../repositories/task.repository.js";
import { ProjectRepository } from "../repositories/project.repository.js";
import { TaskMapper } from "../mappers/task.mapper.js";
import { ProjectMapper } from "../mappers/project.mapper.js";

const logger: PinoLogger = Logger.getLogger();

export interface SyncInput {
  tasks: Task[];
  projects: Project[];
}

export interface SyncOutput {
  tasksToUpdate: Task[];
  projectsToUpdate: Project[];
}

export class SyncService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(userId: string, input: SyncInput): Promise<SyncOutput> {
    logger.info(
      {
        userId,
        tasksCount: input.tasks.length,
        projectsCount: input.projects.length,
      },
      "Starting bulk sync",
    );

    const [tasksToUpdate, projectsToUpdate] = await Promise.all([
      this.syncTasks(userId, input.tasks),
      this.syncProjects(userId, input.projects),
    ]);

    logger.info(
      {
        userId,
        tasksToUpdate: tasksToUpdate.length,
        projectsToUpdate: projectsToUpdate.length,
      },
      "Bulk sync completed",
    );

    return { tasksToUpdate, projectsToUpdate };
  }

  private async syncTasks(
    userId: string,
    clientTasks: Task[],
  ): Promise<Task[]> {
    const flattenedClientTasks: Task[] = [];
    const flatten = (t: Task) => {
      flattenedClientTasks.push(t);
      if (t.subtasks) {
        t.subtasks.forEach((st) => {
          st.parentId = t.id;
          flatten(st);
        });
      }
    };
    clientTasks.forEach(flatten);

    const serverTasks = await this.taskRepository.findByUser(userId);
    const serverTasksMap = new Map(serverTasks.map((task) => [task.id, task]));
    const clientTasksMap = new Map(
      flattenedClientTasks.map((task) => [task.id, task]),
    );

    const tasksToUpsert: Task[] = [];
    const tasksToReturn: Task[] = [];

    for (const clientTask of flattenedClientTasks) {
      const serverTask = serverTasksMap.get(clientTask.id);

      if (!serverTask) {
        tasksToUpsert.push(clientTask);
      } else {
        const serverUpdatedAt = serverTask.updated_at.getTime();
        if (clientTask.updatedAt > serverUpdatedAt) {
          tasksToUpsert.push(clientTask);
        } else if (serverUpdatedAt > clientTask.updatedAt) {
          tasksToReturn.push(TaskMapper.toDomain(serverTask));
        }
      }
    }

    for (const serverTask of serverTasks) {
      if (!clientTasksMap.has(serverTask.id)) {
        tasksToReturn.push(TaskMapper.toDomain(serverTask));
      }
    }

    if (tasksToUpsert.length > 0) {
      const dbTasks = TaskMapper.toDatabaseList(tasksToUpsert, userId);
      await this.taskRepository.bulkUpsert(userId, dbTasks);
    }

    return tasksToReturn;
  }

  private async syncProjects(
    userId: string,
    clientProjects: Project[],
  ): Promise<Project[]> {
    const serverProjects = await this.projectRepository.findByUser(userId);
    const serverProjectsMap = new Map(
      serverProjects.map((project) => [project.id, project]),
    );
    const clientProjectsMap = new Map(
      clientProjects.map((project) => [project.id, project]),
    );

    const projectsToUpsert: Project[] = [];
    const projectsToReturn: Project[] = [];

    for (const clientProject of clientProjects) {
      const serverProject = serverProjectsMap.get(clientProject.id);

      if (!serverProject) {
        projectsToUpsert.push(clientProject);
      } else {
        const serverUpdatedAt = serverProject.updated_at.getTime();
        const clientUpdatedAt = clientProject.updatedAt || 0;

        if (clientUpdatedAt > serverUpdatedAt) {
          projectsToUpsert.push(clientProject);
        } else if (serverUpdatedAt > clientUpdatedAt) {
          projectsToReturn.push(ProjectMapper.toDomain(serverProject));
        }
      }
    }

    for (const serverProject of serverProjects) {
      if (!clientProjectsMap.has(serverProject.id)) {
        projectsToReturn.push(ProjectMapper.toDomain(serverProject));
      }
    }

    if (projectsToUpsert.length > 0) {
      const dbProjects = ProjectMapper.toDatabaseList(projectsToUpsert, userId);
      await this.projectRepository.bulkUpsert(userId, dbProjects);
    }

    return projectsToReturn;
  }
}
