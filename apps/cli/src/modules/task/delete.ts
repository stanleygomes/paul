import { createApiClient } from "../../api/api";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { runWithLoading } from "../../utils/spinner";
import { resolveTaskId } from "./resolve";

export async function runDeleteTaskModule(taskIdArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const taskId = await resolveTaskId(taskIdArg);

  const api = createApiClient(token);
  await runWithLoading(() => api.task.delete(taskId));

  renderSuccess(await t("taskDeleted"));
}
