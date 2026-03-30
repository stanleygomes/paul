import { httpClient } from "@done/http";
import { API_URL } from "../../../config/api-config";
import type { Project } from "@done/entities";

export const projectApiService = {
  async getProjects(token: string): Promise<Project[]> {
    const response = await httpClient.get<Project[]>(`${API_URL}/v1/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async createProject(token: string, project: Project): Promise<Project> {
    const response = await httpClient.post<Project>(
      `${API_URL}/v1/projects`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },

  async updateProject(
    token: string,
    projectId: string,
    project: Partial<Project>,
  ): Promise<Project> {
    const response = await httpClient.put<Project>(
      `${API_URL}/v1/projects/${projectId}`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },

  async deleteProject(token: string, projectId: string): Promise<void> {
    await httpClient.delete(`${API_URL}/v1/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
