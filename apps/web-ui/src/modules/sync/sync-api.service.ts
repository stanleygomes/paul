import { httpClient } from "@paul/http";
import { CORE_API_URL } from "../../config/api-config";
import type { Task, Project, Memory } from "@paul/entities";

export interface SyncRequest {
  tasks: Task[];
  projects: Project[];
  memories: Memory[];
}

export interface SyncResponse {
  tasksToUpdate: Task[];
  projectsToUpdate: Project[];
  memoriesToUpdate: Memory[];
}

export const syncApiService = {
  async syncTasksAndProjects(
    token: string,
    tasks: Task[],
    projects: Project[],
    memories: Memory[],
  ): Promise<SyncResponse> {
    const response = await httpClient.post<SyncResponse>(
      `${CORE_API_URL}/v1/sync`,
      {
        tasks,
        projects,
        memories,
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
