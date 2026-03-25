import type { Task } from "@models/task";

export class TaskManager {
  constructor(
    private readonly tasks: Task[],
    private readonly generateId: () => string = () => crypto.randomUUID(),
    private readonly now: () => number = () => Date.now(),
  ) {}

  create(content: string): Task[] {
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
