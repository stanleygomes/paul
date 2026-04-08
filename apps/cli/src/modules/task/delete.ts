import { createApiClient } from "../../api/api";
import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { renderSuccess } from "../../utils/output.util";
import { runWithLoading } from "../../utils/spinner.util";
import { resolveTaskId } from "./resolve";

export async function runDeleteTaskModule(taskIdArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const taskId = await resolveTaskId(taskIdArg);

  const api = createApiClient(token);
  await runWithLoading(() => api.task.delete(taskId));

  renderSuccess(await t("taskDeleted"));
}
