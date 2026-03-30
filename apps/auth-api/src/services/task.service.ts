import type { Task } from "@done/entities";
import { Logger } from "@done/logger";
import type { Logger as PinoLogger } from "pino";
import { generateUUID } from "@done/utils";
import { TaskRepository } from "../repositories/task.repository.js";
import { TaskMapper } from "../mappers/task.mapper.js";
import { BusinessError } from "../errors/BusinessError.js";

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
}
