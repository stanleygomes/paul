import { httpClient } from "@paul/http";
import type { CliTask, TaskListResponse } from "../types/task.types";
import { CORE_API_URL } from "../utils/runtime-config";
import { taskListResponseSchema } from "../validators/task.validators";

export async function listTasks(token: string): Promise<CliTask[]> {
  const response = await httpClient.get<TaskListResponse>(
    `${CORE_API_URL}/v1/tasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return taskListResponseSchema.parse(response.data).tasks;
}

export async function createTask(
  token: string,
  task: Record<string, unknown>,
): Promise<CliTask> {
  const response = await httpClient.post<CliTask>(
    `${CORE_API_URL}/v1/tasks`,
    task,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function updateTask(
  token: string,
  taskId: string,
  payload: Record<string, unknown>,
): Promise<CliTask> {
  const response = await httpClient.put<CliTask>(
    `${CORE_API_URL}/v1/tasks/${taskId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function deleteTask(token: string, taskId: string): Promise<void> {
  await httpClient.delete(`${CORE_API_URL}/v1/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
