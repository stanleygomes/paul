import type { Project, Task } from "@done/entities";
import { Logger } from "@done/node-utils";
import type { Logger as PinoLogger } from "pino";
import { TaskSyncService } from "./task-sync.service.js";
import { ProjectSyncService } from "./project-sync.service.js";

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
    private readonly taskSyncService: TaskSyncService,
    private readonly projectSyncService: ProjectSyncService,
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
      this.taskSyncService.sync(userId, input.tasks),
      this.projectSyncService.sync(userId, input.projects),
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
}
