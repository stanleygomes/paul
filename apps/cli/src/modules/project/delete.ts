import { createApiClient } from "../../api/api";
import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { renderSuccess } from "../../utils/output.util";
import { runWithLoading } from "../../utils/spinner.util";
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
