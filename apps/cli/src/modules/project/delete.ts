import { createApiClient } from "../../api";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { runWithLoading } from "../../utils/spinner";
import { resolveProjectId } from "./resolve";

export async function runDeleteProjectModule(
  projectIdArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const projectId = await resolveProjectId(projectIdArg);

  const api = createApiClient(token);
  await runWithLoading(() => api.project.delete(projectId));

  renderSuccess(await t("projectDeleted"));
}
