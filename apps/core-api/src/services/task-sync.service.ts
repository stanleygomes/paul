import type { Task } from "@paul/entities";
import {
  TaskRepository,
  type DbTask,
} from "../repositories/task.repository.js";
import { TaskMapper } from "../mappers/task.mapper.js";

export class TaskSyncService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async sync(userId: string, clientTasks: Task[]): Promise<Task[]> {
    const flattenedClientTasks = this.flattenTasks(clientTasks);
    const serverTasks = await this.taskRepository.findByUser(userId);

    const serverTasksMap = new Map(serverTasks.map((t) => [t.id, t]));
    const clientTasksMap = new Map(flattenedClientTasks.map((t) => [t.id, t]));

    const { tasksToUpsert, tasksToReturn } = this.compareAndCollect(
      flattenedClientTasks,
      serverTasksMap,
    );

    const missingFromServer = this.getMissingFromServer(
      serverTasks,
      clientTasksMap,
    );
    tasksToReturn.push(...missingFromServer);

    await this.persistUpserts(userId, tasksToUpsert);

    return tasksToReturn;
  }

  private flattenTasks(tasks: Task[]): Task[] {
    const flattened: Task[] = [];
    const flatten = (t: Task) => {
      flattened.push(t);
      if (t.subtasks) {
        t.subtasks.forEach((st) => {
          st.parentId = t.id;
          flatten(st);
        });
      }
    };
    tasks.forEach(flatten);
    return flattened;
  }

  private compareAndCollect(
    clientTasks: Task[],
    serverTasksMap: Map<string, DbTask>,
  ): { tasksToUpsert: Task[]; tasksToReturn: Task[] } {
    const tasksToUpsert: Task[] = [];
    const tasksToReturn: Task[] = [];

    for (const clientTask of clientTasks) {
      const serverTask = serverTasksMap.get(clientTask.id);
      const resolution = this.resolveConflict(clientTask, serverTask);

      if (resolution.toUpsert) tasksToUpsert.push(resolution.toUpsert);
      if (resolution.toReturn) tasksToReturn.push(resolution.toReturn);
    }

    return { tasksToUpsert, tasksToReturn };
  }

  private resolveConflict(
    clientTask: Task,
    serverTask?: DbTask,
  ): { toUpsert?: Task; toReturn?: Task } {
    if (!serverTask) {
      return { toUpsert: clientTask };
    }

    if (this.isClientTaskMoreRecent(clientTask, serverTask)) {
      return { toUpsert: clientTask };
    }

    if (this.isServerTaskMoreRecent(clientTask, serverTask)) {
      return { toReturn: TaskMapper.toDomain(serverTask) };
    }

    return {};
  }

  private isClientTaskMoreRecent(
    clientTask: Task,
    serverTask: DbTask,
  ): boolean {
    return clientTask.updatedAt > serverTask.updated_at.getTime();
  }

  private isServerTaskMoreRecent(
    clientTask: Task,
    serverTask: DbTask,
  ): boolean {
    return serverTask.updated_at.getTime() > clientTask.updatedAt;
  }

  private getMissingFromServer(
    serverTasks: DbTask[],
    clientTasksMap: Map<string, Task>,
  ): Task[] {
    const missing: Task[] = [];
    for (const serverTask of serverTasks) {
      if (!clientTasksMap.has(serverTask.id)) {
        missing.push(TaskMapper.toDomain(serverTask));
      }
    }
    return missing;
  }

  private async persistUpserts(userId: string, tasks: Task[]): Promise<void> {
    if (tasks.length === 0) return;
    const dbTasks = TaskMapper.toDatabaseList(tasks, userId);
    await this.taskRepository.bulkUpsert(userId, dbTasks);
  }
}
