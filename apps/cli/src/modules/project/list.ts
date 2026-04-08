import { listProjects } from "../../api/resources/project";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderInfo } from "../../utils/output";
import { runWithLoading } from "../../utils/spinner";
import { formatProjectLine } from "../../utils/format/project-format";

export async function runListProjectsModule(): Promise<void> {
  const token = await requireSessionToken();
  const projects = await runWithLoading(async () => {
    const allProjects = await listProjects(token);
    return allProjects.filter((project) => !project.isDeleted);
  });

  if (projects.length === 0) {
    renderInfo(await t("noProjects"));
    return;
  }

  for (const project of projects) {
    console.log(formatProjectLine(project));
  }
}
