import { FastifyInstance, FastifyRequest } from "fastify";
import { createTaskSchema, updateTaskSchema } from "@paul/entities";
import {
  createTaskSchemaDoc,
  deleteTaskSchema,
  getTaskSchema,
  listTasksSchema,
  suggestSubtasksSchema,
  updateTaskSchemaDoc,
} from "./task.doc.js";
import type { Task } from "@paul/entities";
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
      { preHandler: AuthMiddleware.authorize, schema: createTaskSchemaDoc },
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
      { preHandler: AuthMiddleware.authorize, schema: listTasksSchema },
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
      { preHandler: AuthMiddleware.authorize, schema: getTaskSchema },
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
      { preHandler: AuthMiddleware.authorize, schema: updateTaskSchemaDoc },
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
      { preHandler: AuthMiddleware.authorize, schema: deleteTaskSchema },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;

        const task = await this.taskService.softDelete(
          authRequest.user.id,
          request.params.id,
        );

        reply.send(task);
      },
    );

    fastify.post<{ Params: { id: string } }>(
      `${prefix}/v1/tasks/:id/suggest-subtasks`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: suggestSubtasksSchema,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const token = request.headers.authorization;

        const subtasks = await this.taskService.suggestSubtasks(
          authRequest.user.id,
          request.params.id,
          token,
        );

        reply.send({ subtasks });
      },
    );
  }
}
