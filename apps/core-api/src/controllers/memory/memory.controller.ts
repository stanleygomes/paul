import { FastifyInstance, FastifyRequest } from "fastify";
import { createMemorySchema, updateMemorySchema, Memory } from "@paul/entities";
import {
  createMemorySchemaDoc,
  deleteMemorySchema,
  listMemoriesSchema,
  updateMemorySchemaDoc,
} from "./memory.doc";
import { MemoryService } from "../../services/memory.service";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: Partial<Memory> }>(
      `${prefix}/v1/memories`,
      { preHandler: AuthMiddleware.authorize, schema: createMemorySchemaDoc },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const validatedData = createMemorySchema.parse(request.body);

        const memory = await this.memoryService.create(
          authRequest.user.id,
          validatedData as any,
        );

        reply.status(201).send(memory);
      },
    );

    fastify.get(
      `${prefix}/v1/memories`,
      { preHandler: AuthMiddleware.authorize, schema: listMemoriesSchema },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;

        const memories = await this.memoryService.getAll(authRequest.user.id);
        reply.send({ memories });
      },
    );

    fastify.put<{ Params: { id: string }; Body: Partial<Memory> }>(
      `${prefix}/v1/memories/:id`,
      { preHandler: AuthMiddleware.authorize, schema: updateMemorySchemaDoc },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const validatedData = updateMemorySchema.parse(request.body);

        const memory = await this.memoryService.update(
          authRequest.user.id,
          request.params.id,
          validatedData as any,
        );

        reply.send(memory);
      },
    );

    fastify.delete<{ Params: { id: string } }>(
      `${prefix}/v1/memories/:id`,
      { preHandler: AuthMiddleware.authorize, schema: deleteMemorySchema },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;

        await this.memoryService.delete(authRequest.user.id, request.params.id);

        reply.status(204).send();
      },
    );
  }
}
