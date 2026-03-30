import { FastifyInstance, FastifyRequest } from "fastify";
import { bulkSyncTasksSchema, bulkSyncProjectsSchema } from "@done/entities";
import type { Task, Project } from "@done/entities";
import { SyncService } from "../../services/sync.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{
      Body: { tasks: Task[]; projects: Project[] };
    }>(
      `${prefix}/v1/sync`,
      {
        preHandler: AuthMiddleware.authorize,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;

        const validatedTasks = bulkSyncTasksSchema.parse({
          tasks: request.body.tasks || [],
        });
        const validatedProjects = bulkSyncProjectsSchema.parse({
          projects: request.body.projects || [],
        });

        const result = await this.syncService.execute(authRequest.user.id, {
          tasks: validatedTasks.tasks,
          projects: validatedProjects.projects,
        });

        reply.send(result);
      },
    );
  }
}
