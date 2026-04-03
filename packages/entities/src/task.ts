export interface Task {
  id: string;
  content: string;
  title: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
  notes: string;
  important: boolean;
  dueDate: string;
  dueTime: string;
  url: string;
  subtasks: Task[];
  tags: string[];
  projectId?: string;
  parentId?: string | null;
  isDeleted?: boolean;
  deletedAt?: number | null;
}
