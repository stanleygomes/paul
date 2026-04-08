import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { selectAndParse } from "../../utils/prompt.util";
import { runWithLoading } from "../../utils/spinner.util";
import { ProjectValidator } from "../../validators/project.validators";
import { getActiveProjects } from "./list";

export async function resolveProjectId(projectId?: string): Promise<string> {
  if (projectId) {
    return ProjectValidator.id.parse(projectId);
  }

  const token = await requireSessionToken();
  const projects = await runWithLoading(() => getActiveProjects(token));

  if (projects.length === 0) {
    throw new Error(await t("noProjects"));
  }

  return selectAndParse({
    messageKey: "selectProject",
    choices: projects.map((project) => ({
      name: project.name,
      value: project.id,
    })),
  });
}
