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
