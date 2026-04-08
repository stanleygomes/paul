import type { Project } from "@paul/entities";
import { humanizeDate } from "@paul/utils";

export function formatProjectLine(project: Project): string {
  const date = project.createdAt
    ? humanizeDate(new Date(project.createdAt))
    : "-";
  return `${project.id} | ${project.name} | ${date}`;
}
