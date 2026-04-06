import { TaskRepository } from "../repositories/task.repository";
import { ProjectRepository } from "../repositories/project.repository";
import { SyncService } from "../services/sync.service";
import { TaskService } from "../services/task.service";
import { ProjectService } from "../services/project.service";
import { SyncController } from "../controllers/sync/sync.controller";
import { TaskController } from "../controllers/task/task.controller";
import { ProjectController } from "../controllers/project/project.controller";
import { PlanningRepository } from "../repositories/planning.repository";
import { AiService } from "../services/ai.service";
import { PlanningConversationService } from "../services/planning-conversation.service";
import { PlanningMessageService } from "../services/planning-message.service";
import { PlanningConversationController } from "../controllers/planning-conversation/planning-conversation.controller";
import { PlanningMessageController } from "../controllers/planning-message/planning-message.controller";
import { MemoryService } from "../services/memory.service";
import { MemoryController } from "../controllers/memory/memory.controller";

import { TaskSyncService } from "../services/task-sync.service";
import { ProjectSyncService } from "../services/project-sync.service";

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
