export interface CliTask {
  id: string;
  title: string;
  content: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
  notes: string;
  important: boolean;
  dueDate: string;
  dueTime: string;
  url: string;
  subtasks: unknown[];
  tags: string[];
  projectId?: string;
  parentId?: string | null;
  isDeleted?: boolean;
  deletedAt?: number | null;
}

export interface TaskListResponse {
  tasks: CliTask[];
}
