import { FastifyInstance } from "fastify";
import {
  authController,
  syncController,
  taskController,
  projectController,
} from "./providers/dependencies.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    authController.registerRoutes(fastify, prefix);
    syncController.registerRoutes(fastify, prefix);
    taskController.registerRoutes(fastify, prefix);
    projectController.registerRoutes(fastify, prefix);
  }
}
