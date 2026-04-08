import { updateTask } from "../../api/resources/task";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import { taskTitleSchema } from "../../validators/task.validators";
import { resolveTaskId } from "./resolve";

export async function runUpdateTaskModule(
  taskIdArg?: string,
  titleArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const taskId = await resolveTaskId(taskIdArg);
  const title = await askAndParse({
    messageKey: "askTaskTitle",
    schema: taskTitleSchema,
    initialValue: titleArg,
  });

  await runWithLoading(() =>
    updateTask(token, taskId, {
      title,
      updatedAt: Date.now(),
    }),
  );

  renderSuccess(await t("taskUpdated"));
}
