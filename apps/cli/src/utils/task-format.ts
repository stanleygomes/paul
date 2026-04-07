import type { CliTask } from "../types/task.types";
import { humanizeDate } from "@paul/utils";

export function formatTaskLine(task: CliTask): string {
  const date = task.createdAt ? humanizeDate(new Date(task.createdAt)) : "-";
  return `${task.id} | ${task.title} | ${date}`;
}
