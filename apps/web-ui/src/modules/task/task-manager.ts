import type { Task } from "@paul/entities";
import { generateUUID } from "@paul/utils";

export class TaskManager {
  constructor(
    private readonly tasks: Task[],
    private readonly generateId: () => string = () => generateUUID(),
    private readonly now: () => number = () => Date.now(),
  ) {}

  create(content: string, params: Partial<Task> = {}): Task[] {
    const value = content.trim();
    if (!value) {
      return this.tasks;
    }

    return [
      {
        id: this.generateId(),
        content: value,
        title: value,
        done: false,
        createdAt: this.now(),
        updatedAt: this.now(),
        deletedAt: null,
        notes: "",
        important: false,
        dueDate: "",
        dueTime: "",
        url: "",
        subtasks: [],
        tags: [],
        ...params,
      },
      ...this.tasks,
    ];
  }

  toggle(id: string): Task[] {
    return this.tasks.map((task) =>
      task.id === id
        ? { ...task, done: !task.done, updatedAt: this.now() }
        : task,
    );
  }

  update(id: string, content: string): Task[] {
    const value = content.trim();

    if (!value) {
      return this.tasks;
    }

    return this.tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            content: value,
            title: task.title === task.content ? value : task.title,
            updatedAt: this.now(),
          }
        : task,
    );
  }

  softRemove(id: string): Task[] {
    return this.tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isDeleted: true,
            deletedAt: this.now(),
            updatedAt: this.now(),
          }
        : task,
    );
  }

  restore(id: string): Task[] {
    return this.tasks.map((task) =>
      task.id === id
        ? { ...task, isDeleted: false, deletedAt: null, updatedAt: this.now() }
        : task,
    );
  }

  remove(id: string): Task[] {
    return this.tasks.filter((task) => task.id !== id);
  }
}
