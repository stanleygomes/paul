import { createApiClient } from "../../api/api";
import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { renderSuccess } from "../../utils/output.util";
import { askAndParse } from "../../utils/prompt.util";
import { runWithLoading } from "../../utils/spinner.util";
import { ProjectValidator } from "../../validators/project.validators";
import { resolveProjectId } from "./resolve";

export async function runEditProjectModule(
  projectIdArg?: string,
  nameArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const projectId = await resolveProjectId(projectIdArg);
  const name = await askAndParse({
    messageKey: "askProjectTitle",
    schema: ProjectValidator.name,
    initialValue: nameArg,
  });

  const api = createApiClient(token);
  await runWithLoading(() =>
    api.project.update(projectId, {
      name,
      updatedAt: Date.now(),
    }),
  );

  renderSuccess(await t("projectUpdated"));
}
