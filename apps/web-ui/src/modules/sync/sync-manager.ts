import type { Task, Project, Memory } from "@paul/entities";

interface SyncableEntity {
  id: string;
  updatedAt?: number;
  updated_at?: number | Date;
}

function mergeEntities<T extends SyncableEntity>(
  localItems: T[],
  serverItems: T[],
): T[] {
  if (!serverItems || !Array.isArray(serverItems)) return localItems;
  const merged = [...localItems];

  for (const serverItem of serverItems) {
    const localIndex = merged.findIndex((item) => item.id === serverItem.id);
    if (localIndex !== -1) {
      merged[localIndex] = serverItem;
    } else {
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

  mergeMemories(localMemories: Memory[], memoriesToUpdate: Memory[]): Memory[] {
    return mergeEntities(localMemories, memoriesToUpdate);
  },
};
