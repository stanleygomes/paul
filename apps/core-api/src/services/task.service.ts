import type { Task } from "@paul/entities";
import { Logger } from "@paul/node-utils";
import type { Logger as PinoLogger } from "pino";
import { generateUUID } from "@paul/utils";
import { TaskRepository } from "../repositories/task.repository.js";
import { TaskMapper } from "../mappers/task.mapper.js";
import { BusinessError } from "../errors/BusinessError.js";
import { config } from "../config/environment.js";

const logger: PinoLogger = Logger.getLogger();

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(userId: string, taskData: Partial<Task>): Promise<Task> {
    const now = Date.now();
    const task: Task = {
      id: generateUUID(),
      content: taskData.content || "",
      done: false,
      createdAt: now,
      updatedAt: now,
      notes: "",
      important: false,
      dueDate: "",
      dueTime: "",
      url: "",
      subtasks: [],
      tags: [],
      isDeleted: false,
      deletedAt: null,
      ...taskData,
    };

    const dbTask = TaskMapper.toDatabase(task, userId);
    await this.taskRepository.bulkUpsert(userId, [dbTask]);

    logger.info({ userId, taskId: task.id }, "Task created");
    return task;
  }

  async update(
    userId: string,
    taskId: string,
    taskData: Partial<Task>,
  ): Promise<Task> {
    const existing = await this.taskRepository.findById(userId, taskId);
    if (!existing) {
      throw new BusinessError("Task not found");
    }

    const updated = await this.taskRepository.update(userId, taskId, {
      ...taskData,
      updated_at: new Date(),
    });

    if (!updated) {
      throw new BusinessError("Task update failed");
    }

    logger.info({ userId, taskId }, "Task updated");
    return TaskMapper.toDomain(updated);
  }

  async get(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskRepository.findById(userId, taskId);
    if (!task) {
      throw new BusinessError("Task not found");
    }
    return TaskMapper.toDomain(task);
  }

  async list(userId: string, since?: number): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUser(userId, since);
    return TaskMapper.toDomainList(tasks);
  }

  async softDelete(userId: string, taskId: string): Promise<Task> {
    const deleted = await this.taskRepository.softDelete(userId, taskId);
    if (!deleted) {
      throw new BusinessError("Task not found");
    }

    logger.info({ userId, taskId }, "Task soft deleted");
    return TaskMapper.toDomain(deleted);
  }

  async suggestSubtasks(
    userId: string,
    taskId: string,
    authToken?: string,
  ): Promise<string[]> {
    const task = await this.get(userId, taskId);

    const prompt = `Você é um assistente especializado em produtividade. Com base na tarefa abaixo, sugira uma lista de sub-tarefas curtas e objetivas para ajudar a concluí-la.
Tarefa: ${task.content}
${task.notes ? `Notas: ${task.notes}` : ""}

Responda apenas com um JSON no seguinte formato:
{
  "subtasks": [
    { "content": "Nome da subtarefa 1" },
    { "content": "Nome da subtarefa 2" }
  ]
}
`;

    try {
      // Note: We are calling ai-api internally.
      // Since it requires a token in its middleware, we might need to bypass it or provide a system token.
      // However, for simplicity now, let's assume we can call it.
      // Wait, ai-api is usually on a different port.
      const aiApiUrl = config.services.ai.url;

      const response = await fetch(`${aiApiUrl}/prompt/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: authToken } : {}),
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error({ status: response.status, errorText }, "AI API error");
        throw new BusinessError("AI subtask suggestion failed at API");
      }

      const data = (await response.json()) as { response: string };

      // Parse the response string which should be JSON
      try {
        const parsed = JSON.parse(data.response) as {
          subtasks: { content: string }[];
        };
        return parsed.subtasks.map((s) => s.content);
      } catch (e) {
        logger.error(
          { response: data.response, error: e },
          "Failed to parse AI JSON response",
        );
        return data.response
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .slice(0, 5);
      }
    } catch (error) {
      if (error instanceof BusinessError) throw error;
      logger.error({ error, taskId }, "Failed to suggest subtasks");
      throw new BusinessError("AI subtask suggestion failed");
    }
  }
}
