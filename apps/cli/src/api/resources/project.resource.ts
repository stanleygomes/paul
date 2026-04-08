import type { Project } from "@paul/entities";
import { projectListResponseSchema } from "../../validators/project.validators";
import { BaseResource } from "../base.resource";

export class ProjectResource extends BaseResource {
  async list(): Promise<Project[]> {
    const response = await this.client.get<{ projects: Project[] }>(
      "/v1/projects",
      this.getRequestConfig(),
    );

    return projectListResponseSchema.parse(response.data).projects;
  }

  async create(project: Record<string, unknown>): Promise<Project> {
    const response = await this.client.post<Project>(
      "/v1/projects",
      project,
      this.getRequestConfig(),
    );

    return response.data;
  }

  async update(
    projectId: string,
    payload: Record<string, unknown>,
  ): Promise<Project> {
    const response = await this.client.put<Project>(
      `/v1/projects/${projectId}`,
      payload,
      this.getRequestConfig(),
    );

    return response.data;
  }

  async delete(projectId: string): Promise<void> {
    await this.client.delete(
      `/v1/projects/${projectId}`,
      this.getRequestConfig(),
    );
  }
}
