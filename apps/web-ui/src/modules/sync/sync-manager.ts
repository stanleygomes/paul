import type { Task, Project } from "@paul/entities";

interface SyncableEntity {
  id: string;
  updatedAt?: number;
}

function mergeEntities<T extends SyncableEntity>(
  localItems: T[],
  serverItems: T[],
): T[] {
  const merged = [...localItems];

  // Update existing items or add new ones from server
  for (const serverItem of serverItems) {
    const localIndex = merged.findIndex((item) => item.id === serverItem.id);
    if (localIndex !== -1) {
      // Server version always wins in this simple implementation
      // following the plan: "server wins via updatedAt"
      // but only if the server actually sent it in tasksToUpdate
      merged[localIndex] = serverItem;
    } else {
      // New item from server
      merged.push(serverItem);
    }
  }

  return merged;
}

export const SyncManager = {
  mergeTasks(localTasks: Task[], tasksToUpdate: Task[]): Task[] {
    return mergeEntities(localTasks, tasksToUpdate);
  },

  mergeProjects(
    localProjects: Project[],
    projectsToUpdate: Project[],
  ): Project[] {
    return mergeEntities(localProjects, projectsToUpdate);
  },
};
