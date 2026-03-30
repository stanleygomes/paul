export interface Task {
  id: string;
  content: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
  notes: string;
  important: boolean;
  dueDate: string;
  dueTime: string;
  url: string;
  subtasks: TaskSubtask[];
  tags: string[];
  projectId?: string;
  isDeleted?: boolean;
  deletedAt?: number | null;
}

export interface TaskSubtask {
  id: string;
  title: string;
  done: boolean;
}
