import { httpClient } from "@done/http";
import { API_URL } from "../../../config/api-config";
import type { Task, Project } from "@done/entities";

export interface SyncRequest {
  tasks: Task[];
  projects: Project[];
}

export interface SyncResponse {
  tasksToUpdate: Task[];
  projectsToUpdate: Project[];
}

export const syncApiService = {
  async syncTasksAndProjects(
    token: string,
    tasks: Task[],
    projects: Project[],
  ): Promise<SyncResponse> {
    const response = await httpClient.post<SyncResponse>(
      `${API_URL}/v1/sync`,
      {
        tasks,
        projects,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
};
