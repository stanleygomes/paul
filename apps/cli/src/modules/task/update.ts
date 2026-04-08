import { createApiClient } from "../../api/api";
import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { renderSuccess } from "../../utils/output.util";
import { askAndParse } from "../../utils/prompt.util";
import { runWithLoading } from "../../utils/spinner.util";
import { TaskValidator } from "../../validators/task.validators";
import { resolveTaskId } from "./resolve";

export async function runUpdateTaskModule(
  taskIdArg?: string,
  titleArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const taskId = await resolveTaskId(taskIdArg);
  const title = await askAndParse({
    messageKey: "askTaskTitle",
    schema: TaskValidator.title,
    initialValue: titleArg,
  });

  const api = createApiClient(token);
  await runWithLoading(() =>
    api.task.update(taskId, {
      title,
      updatedAt: Date.now(),
    }),
  );

  renderSuccess(await t("taskUpdated"));
}
