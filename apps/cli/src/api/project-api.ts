import { httpClient } from "@paul/http";
import type { CliProject, ProjectListResponse } from "../types/project.types";
import { CORE_API_URL } from "../utils/runtime-config";
import { projectListResponseSchema } from "../validators/project.validators";

export async function listProjects(token: string): Promise<CliProject[]> {
  const response = await httpClient.get<ProjectListResponse>(
    `${CORE_API_URL}/v1/projects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return projectListResponseSchema.parse(response.data).projects;
}

export async function createProject(
  token: string,
  project: Record<string, unknown>,
): Promise<CliProject> {
  const response = await httpClient.post<CliProject>(
    `${CORE_API_URL}/v1/projects`,
    project,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function updateProject(
  token: string,
  projectId: string,
  payload: Record<string, unknown>,
): Promise<CliProject> {
  const response = await httpClient.put<CliProject>(
    `${CORE_API_URL}/v1/projects/${projectId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function deleteProject(
  token: string,
  projectId: string,
): Promise<void> {
  await httpClient.delete(`${CORE_API_URL}/v1/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
