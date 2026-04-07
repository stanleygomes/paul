export interface CliProject {
  id: string;
  name: string;
  color: string;
  createdAt?: number;
  updatedAt?: number;
  isDeleted?: boolean;
  deletedAt?: number | null;
}

export interface ProjectListResponse {
  projects: CliProject[];
}
