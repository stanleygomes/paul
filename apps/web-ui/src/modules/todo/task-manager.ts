import type { Task } from "@models/task";
import { generateUUID } from "@done/utils/src/uuid-utils";

export class TaskManager {
  constructor(
    private readonly tasks: Task[],
    private readonly generateId: () => string = () => generateUUID(),
    private readonly now: () => number = () => Date.now(),
  ) {}

  create(content: string, projectId: string | null = null): Task[] {
    const value = content.trim();
    if (!value) {
      return this.tasks;
    }

    return [
      {
        id: this.generateId(),
        content: value,
        done: false,
        createdAt: this.now(),
        projectId,
        notes: "",
        important: false,
        dueDate: "",
        dueTime: "",
        url: "",
        subtasks: [],
        tags: [],
      },
      ...this.tasks,
    ];
  }

  toggle(id: string): Task[] {
    return this.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
  }

  update(id: string, content: string): Task[] {
    const value = content.trim();

    if (!value) {
      return this.tasks;
    }

    return this.tasks.map((task) =>
      task.id === id ? { ...task, content: value } : task,
    );
  }

  remove(id: string): Task[] {
    return this.tasks.filter((task) => task.id !== id);
  }
}
