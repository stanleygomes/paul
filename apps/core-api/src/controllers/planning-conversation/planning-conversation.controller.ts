import { FastifyInstance, FastifyRequest } from "fastify";
import { PlanningConversationService } from "../../services/planning-conversation.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";
import {
  listConversationsSchema,
  createConversationSchema,
  deleteConversationSchema,
} from "./planning-conversation.doc.js";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class PlanningConversationController {
  constructor(private readonly planningService: PlanningConversationService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.get(
      `${prefix}/v1/planning/conversations`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: listConversationsSchema,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const conversations = await this.planningService.listConversations(
          authRequest.user.id,
        );
        reply.send({ conversations });
      },
    );

    fastify.post<{ Body: { title?: string } }>(
      `${prefix}/v1/planning/conversations`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: createConversationSchema,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const { title } = request.body;
        const conversation = await this.planningService.createConversation(
          authRequest.user.id,
          title,
        );
        reply.status(201).send(conversation);
      },
    );

    fastify.delete<{ Params: { conversationId: string } }>(
      `${prefix}/v1/planning/conversations/:conversationId`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: deleteConversationSchema,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const { conversationId } = request.params;
        await this.planningService.deleteConversation(
          authRequest.user.id,
          conversationId,
        );
        reply.send({ success: true });
      },
    );
  }
}
