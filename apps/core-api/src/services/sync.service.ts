import type { Project, Task } from "@paul/entities";
import { Logger } from "@paul/node-utils";
import type { Logger as PinoLogger } from "pino";
import { TaskSyncService } from "./task-sync.service.js";
import { ProjectSyncService } from "./project-sync.service.js";
import { MemoryService } from "./memory.service.js";
import type { Memory } from "@paul/entities";

const logger: PinoLogger = Logger.getLogger();

export interface SyncInput {
  tasks: Task[];
  projects: Project[];
  memories: Memory[];
}

export interface SyncOutput {
  tasksToUpdate: Task[];
  projectsToUpdate: Project[];
  memoriesToUpdate: Memory[];
}

export class SyncService {
  constructor(
    private readonly taskSyncService: TaskSyncService,
    private readonly projectSyncService: ProjectSyncService,
    private readonly memoryService: MemoryService,
  ) {}

  async execute(userId: string, input: SyncInput): Promise<SyncOutput> {
    logger.info(
      {
        userId,
        tasksCount: input.tasks.length,
        projectsCount: input.projects.length,
        memoriesCount: input.memories.length,
      },
      "Starting bulk sync",
    );

    const tasksToUpdate = await this.taskSyncService.sync(userId, input.tasks);

    const projectsToUpdate = await this.projectSyncService.sync(
      userId,
      input.projects,
    );

    const memoriesToUpdate = await this.memoryService.sync(
      userId,
      input.memories,
    );

    logger.info(
      {
        userId,
        tasksToUpdate: tasksToUpdate.length,
        projectsToUpdate: projectsToUpdate.length,
        memoriesToUpdate: memoriesToUpdate.length,
      },
      "Bulk sync completed",
    );

    return { tasksToUpdate, projectsToUpdate, memoriesToUpdate };
  }
}
