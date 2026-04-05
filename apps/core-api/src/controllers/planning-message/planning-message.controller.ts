import { FastifyInstance, FastifyRequest } from "fastify";
import { PlanningMessageService } from "../../services/planning-message.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";
import { chatSchema, getMessagesSchema } from "./planning-message.doc.js";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class PlanningMessageController {
  constructor(private readonly planningService: PlanningMessageService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{
      Params: { conversationId: string };
      Body: { message: string };
    }>(
      `${prefix}/v1/planning/conversations/:conversationId/messages`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: chatSchema,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const { conversationId } = request.params;
        const { message } = request.body;

        const response = await this.planningService.chat(
          authRequest.user.id,
          conversationId,
          message,
          request.headers.authorization,
        );

        reply.send({ response });
      },
    );

    fastify.get<{ Params: { conversationId: string } }>(
      `${prefix}/v1/planning/conversations/:conversationId/messages`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: getMessagesSchema,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const { conversationId } = request.params;
        const messages = await this.planningService.getMessages(
          authRequest.user.id,
          conversationId,
        );
        reply.send({ messages });
      },
    );
  }
}
