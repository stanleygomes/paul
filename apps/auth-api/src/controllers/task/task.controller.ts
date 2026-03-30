import { FastifyInstance, FastifyRequest } from "fastify";
import { createTaskSchema, updateTaskSchema } from "@done/entities";
import type { Task } from "@done/entities";
import { TaskService } from "../../services/task.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: Partial<Task> }>(
      `${prefix}/v1/tasks`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const validatedData = createTaskSchema.parse(request.body);

        const task = await this.taskService.create(
          authRequest.user.id,
          validatedData,
        );

        reply.status(201).send(task);
      },
    );

    fastify.get<{ Querystring: { since?: string } }>(
      `${prefix}/v1/tasks`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const since = request.query.since
          ? Number.parseInt(request.query.since, 10)
          : undefined;

        const tasks = await this.taskService.list(authRequest.user.id, since);
        reply.send({ tasks });
      },
    );

    fastify.get<{ Params: { id: string } }>(
      `${prefix}/v1/tasks/:id`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;

        const task = await this.taskService.get(
          authRequest.user.id,
          request.params.id,
        );

        reply.send(task);
      },
    );

    fastify.put<{ Params: { id: string }; Body: Partial<Task> }>(
      `${prefix}/v1/tasks/:id`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const validatedData = updateTaskSchema.partial().parse(request.body);

        const task = await this.taskService.update(
          authRequest.user.id,
          request.params.id,
          validatedData,
        );

        reply.send(task);
      },
    );

    fastify.delete<{ Params: { id: string } }>(
      `${prefix}/v1/tasks/:id`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;

        const task = await this.taskService.softDelete(
          authRequest.user.id,
          request.params.id,
        );

        reply.send(task);
      },
    );
  }
}
