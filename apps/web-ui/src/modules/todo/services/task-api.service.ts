import { httpClient } from "@done/http";
import { API_URL } from "../../../config/api-config";
import type { Task } from "@done/entities";

export const taskApiService = {
  async getTasks(token: string, since?: number): Promise<Task[]> {
    const response = await httpClient.get<Task[]>(`${API_URL}/v1/tasks`, {
      params: since ? { since } : {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async createTask(token: string, task: Task): Promise<Task> {
    const response = await httpClient.post<Task>(`${API_URL}/v1/tasks`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async updateTask(
    token: string,
    taskId: string,
    task: Partial<Task>,
  ): Promise<Task> {
    const response = await httpClient.put<Task>(
      `${API_URL}/v1/tasks/${taskId}`,
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
    await httpClient.delete(`${API_URL}/v1/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
