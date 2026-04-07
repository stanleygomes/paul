import type { CliProject } from "../types/project.types";
import { humanizeDate } from "@paul/utils";

export function formatProjectLine(project: CliProject): string {
  const date = project.createdAt
    ? humanizeDate(new Date(project.createdAt))
    : "-";
  return `${project.id} | ${project.name} | ${date}`;
}
