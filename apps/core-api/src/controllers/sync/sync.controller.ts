import { FastifyInstance, FastifyRequest } from "fastify";
import {
  bulkSyncTasksSchema,
  bulkSyncProjectsSchema,
  bulkSyncMemoriesSchema,
} from "@paul/entities";
import { syncSchema } from "./sync.doc.js";
import type { Task, Project, Memory } from "@paul/entities";
import { SyncService } from "../../services/sync.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{
      Body: { tasks: Task[]; projects: Project[]; memories: Memory[] };
    }>(
      `${prefix}/v1/sync`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: syncSchema,
      },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;

        throw new Error("teste");

        const validatedTasks = bulkSyncTasksSchema.parse({
          tasks: request.body.tasks || [],
        });
        const validatedProjects = bulkSyncProjectsSchema.parse({
          projects: request.body.projects || [],
        });

        const validatedMemories = bulkSyncMemoriesSchema.parse({
          memories: request.body.memories || [],
        });

        const result = await this.syncService.execute(authRequest.user.id, {
          tasks: validatedTasks.tasks,
          projects: validatedProjects.projects,
          memories: validatedMemories.memories,
        });

        reply.send(result);
      },
    );
  }
}
