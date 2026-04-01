import { FastifyInstance } from "fastify";
import {
  syncController,
  taskController,
  projectController,
  planningController,
  memoryController,
} from "./providers/dependencies.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    syncController.registerRoutes(fastify, prefix);
    taskController.registerRoutes(fastify, prefix);
    projectController.registerRoutes(fastify, prefix);
    planningController.registerRoutes(fastify, prefix);
    memoryController.registerRoutes(fastify, prefix);
  }
}
