import type { Task } from "@paul/entities";
import { taskListResponseSchema } from "../../validators/task.validators";
import { BaseResource } from "../base.resource";

export class TaskResource extends BaseResource {
  async list(): Promise<Task[]> {
    const response = await this.client.get<{ tasks: Task[] }>(
      "/v1/tasks",
      this.getRequestConfig(),
    );

    return taskListResponseSchema.parse(response.data).tasks;
  }

  async create(task: Record<string, unknown>): Promise<Task> {
    const response = await this.client.post<Task>(
      "/v1/tasks",
      task,
      this.getRequestConfig(),
    );

    return response.data;
  }

  async update(
    taskId: string,
    payload: Record<string, unknown>,
  ): Promise<Task> {
    const response = await this.client.put<Task>(
      `/v1/tasks/${taskId}`,
      payload,
      this.getRequestConfig(),
    );

    return response.data;
  }

  async delete(taskId: string): Promise<void> {
    await this.client.delete(`/v1/tasks/${taskId}`, this.getRequestConfig());
  }
}
