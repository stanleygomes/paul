import { TaskRepository } from "../repositories/task.repository.js";
import { ProjectRepository } from "../repositories/project.repository.js";
import { SyncService } from "../services/sync.service.js";
import { TaskService } from "../services/task.service.js";
import { ProjectService } from "../services/project.service.js";
import { SyncController } from "../controllers/sync/sync.controller.js";
import { TaskController } from "../controllers/task/task.controller.js";
import { ProjectController } from "../controllers/project/project.controller.js";
import { PlanningRepository } from "../repositories/planning.repository.js";
import { AiService } from "../services/ai.service.js";
import { PlanningConversationService } from "../services/planning-conversation.service.js";
import { PlanningMessageService } from "../services/planning-message.service.js";
import { PlanningConversationController } from "../controllers/planning-conversation/planning-conversation.controller.js";
import { PlanningMessageController } from "../controllers/planning-message/planning-message.controller.js";
import { MemoryService } from "../services/memory.service.js";
import { MemoryController } from "../controllers/memory/memory.controller.js";

import { TaskSyncService } from "../services/task-sync.service.js";
import { ProjectSyncService } from "../services/project-sync.service.js";

const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();
const planningRepository = new PlanningRepository();
const aiService = new AiService();

const taskSyncService = new TaskSyncService(taskRepository);
const projectSyncService = new ProjectSyncService(projectRepository);
const memoryService = new MemoryService();

const syncService = new SyncService(
  taskSyncService,
  projectSyncService,
  memoryService,
);
const taskService = new TaskService(taskRepository);
const projectService = new ProjectService(projectRepository);
const planningConversationService = new PlanningConversationService(
  planningRepository,
);
const planningMessageService = new PlanningMessageService(
  planningRepository,
  aiService,
);

export const syncController = new SyncController(syncService);
export const taskController = new TaskController(taskService);
export const projectController = new ProjectController(projectService);
export const planningConversationController =
  new PlanningConversationController(planningConversationService);
export const planningMessageController = new PlanningMessageController(
  planningMessageService,
);
export const memoryController = new MemoryController(memoryService);
