import { FastifyInstance } from "fastify";
import {
  syncController,
  taskController,
  projectController,
  planningConversationController,
  planningMessageController,
  memoryController,
} from "./providers/dependencies.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    syncController.registerRoutes(fastify, prefix);
    taskController.registerRoutes(fastify, prefix);
    projectController.registerRoutes(fastify, prefix);
    planningConversationController.registerRoutes(fastify, prefix);
    planningMessageController.registerRoutes(fastify, prefix);
    memoryController.registerRoutes(fastify, prefix);
  }
}
