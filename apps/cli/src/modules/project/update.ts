import { createApiClient } from "../../api/api";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
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
