import { createApiClient } from "../../api/api";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderInfo } from "../../utils/output";
import { runWithLoading } from "../../utils/spinner";
import { formatProjectLine } from "../../utils/format/project-format";

export async function getActiveProjects(token: string) {
  const api = createApiClient(token);
  const allProjects = await api.project.list();
  return allProjects.filter((project) => !project.isDeleted);
}

export async function runListProjectsModule(): Promise<void> {
  const token = await requireSessionToken();
  const projects = await runWithLoading(() => getActiveProjects(token));

  if (projects.length === 0) {
    renderInfo(await t("noProjects"));
    return;
  }

  for (const project of projects) {
    console.log(formatProjectLine(project));
  }
}
