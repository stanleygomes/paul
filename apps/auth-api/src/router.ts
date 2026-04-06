import { FastifyInstance } from "fastify";
import { authController } from "./providers/dependencies";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    authController.registerRoutes(fastify, prefix);
  }
}
