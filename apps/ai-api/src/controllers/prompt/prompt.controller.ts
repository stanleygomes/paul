import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PromptExecutionService } from "../../services/prompt-execution.service.js";
import { validateExecutePrompt } from "../../schemas/validators/execute-prompt.validator.js";
import { executePromptDoc } from "./prompt.doc.js";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import type { UserAuth } from "../../middlewares/auth.middleware.js";

interface ExecutePromptBody {
  prompt: string;
}

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class PromptController {
  constructor(
    private readonly promptExecutionService: PromptExecutionService,
  ) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: ExecutePromptBody }>(
      `${prefix}/prompt/execute`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: executePromptDoc,
      },
      this.executePrompt.bind(this),
    );
  }

  private async executePrompt(
    request: FastifyRequest<{ Body: ExecutePromptBody }>,
    reply: FastifyReply,
  ) {
    const validatedData = validateExecutePrompt(request.body);
    const user = (request as AuthenticatedRequest).user;
    const result = await this.promptExecutionService.execute(
      validatedData.prompt,
      user,
    );

    reply.send({
      response: result.response,
      createdAt: result.createdAt.toISOString(),
    });
  }
}
