import { FastifyInstance, FastifyRequest } from "fastify";
import { createProjectSchema, updateProjectSchema } from "@done/entities";
import type { Project } from "@done/entities";
import { ProjectService } from "../../services/project.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: Partial<Project> }>(
      `${prefix}/v1/projects`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const validatedData = createProjectSchema.parse(request.body);

        const project = await this.projectService.create(
          authRequest.user.id,
          validatedData,
        );

        reply.status(201).send(project);
      },
    );

    fastify.get(
      `${prefix}/v1/projects`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const projects = await this.projectService.list(authRequest.user.id);

        reply.send({ projects });
      },
    );

    fastify.get<{ Params: { id: string } }>(
      `${prefix}/v1/projects/:id`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const project = await this.projectService.get(
          authRequest.user.id,
          request.params.id,
        );

        reply.send(project);
      },
    );

    fastify.put<{ Params: { id: string }; Body: Partial<Project> }>(
      `${prefix}/v1/projects/:id`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const validatedData = updateProjectSchema.partial().parse(request.body);

        const project = await this.projectService.update(
          authRequest.user.id,
          request.params.id,
          validatedData,
        );

        reply.send(project);
      },
    );

    fastify.delete<{ Params: { id: string } }>(
      `${prefix}/v1/projects/:id`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const project = await this.projectService.softDelete(
          authRequest.user.id,
          request.params.id,
        );
        reply.send(project);
      },
    );
  }
}
