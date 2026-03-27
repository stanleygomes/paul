export interface Task {
  id: string;
  content: string;
  done: boolean;
  createdAt: number;
  projectId: string | null;
  notes: string;
  important: boolean;
  dueDate: string;
  dueTime: string;
  url: string;
  subtasks: TaskSubtask[];
  tags: string[];
}

export interface TaskSubtask {
  id: string;
  title: string;
  done: boolean;
}
