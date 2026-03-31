import { TaskRepository } from "../repositories/task.repository.js";
import { ProjectRepository } from "../repositories/project.repository.js";
import { SyncService } from "../services/sync.service.js";
import { TaskService } from "../services/task.service.js";
import { ProjectService } from "../services/project.service.js";
import { SyncController } from "../controllers/sync/sync.controller.js";
import { TaskController } from "../controllers/task/task.controller.js";
import { ProjectController } from "../controllers/project/project.controller.js";

import { TaskSyncService } from "../services/task-sync.service.js";
import { ProjectSyncService } from "../services/project-sync.service.js";

const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();

const taskSyncService = new TaskSyncService(taskRepository);
const projectSyncService = new ProjectSyncService(projectRepository);

const syncService = new SyncService(taskSyncService, projectSyncService);
const taskService = new TaskService(taskRepository);
const projectService = new ProjectService(projectRepository);

export const syncController = new SyncController(syncService);
export const taskController = new TaskController(taskService);
export const projectController = new ProjectController(projectService);
