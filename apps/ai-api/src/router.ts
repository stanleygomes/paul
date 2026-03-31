import { FastifyInstance } from "fastify";
import { promptController } from "./providers/dependencies.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    promptController.registerRoutes(fastify, prefix);
  }
}
