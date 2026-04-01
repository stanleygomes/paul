import { httpClient } from "@paul/http";
import { CORE_API_URL } from "../../config/api-config";
import type { Task } from "@paul/entities";

export const taskApiService = {
  async getTasks(token: string, since?: number): Promise<Task[]> {
    const response = await httpClient.get<Task[]>(`${CORE_API_URL}/v1/tasks`, {
      params: since ? { since } : {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async createTask(token: string, task: Task): Promise<Task> {
    const response = await httpClient.post<Task>(
      `${CORE_API_URL}/v1/tasks`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },

  async updateTask(
    token: string,
    taskId: string,
    task: Partial<Task>,
  ): Promise<Task> {
    const response = await httpClient.put<Task>(
      `${CORE_API_URL}/v1/tasks/${taskId}`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },

  async deleteTask(token: string, taskId: string): Promise<void> {
    await httpClient.delete(`${CORE_API_URL}/v1/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async suggestSubtasks(token: string, taskId: string): Promise<string[]> {
    const response = await httpClient.post<{ subtasks: string[] }>(
      `${CORE_API_URL}/v1/tasks/${taskId}/suggest-subtasks`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.subtasks;
  },
};
