import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { selectAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import { projectIdSchema } from "../../validators/project.validators";
import { getActiveProjects } from "./list";

export async function resolveProjectId(projectId?: string): Promise<string> {
  if (projectId) {
    return projectIdSchema.parse(projectId);
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
