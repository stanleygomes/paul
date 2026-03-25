import { FastifyInstance } from "fastify";
import { PromptController } from "./providers/dependencies.js";
import { executePromptDoc } from "./controllers/prompt/prompt.doc.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: { prompt: string } }>(
      `${prefix}/prompt/execute`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: executePromptDoc,
      },
      PromptController.executePrompt,
    );
  }
}
