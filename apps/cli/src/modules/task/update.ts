import { input } from "@inquirer/prompts";
import ora from "ora";
import { updateTask } from "../../api/resources/task";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { taskTitleSchema } from "../../validators/task.validators";
import { resolveTaskId } from "./resolve";

export async function runUpdateTaskModule(
  taskIdArg?: string,
  titleArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const taskId = await resolveTaskId(taskIdArg);
  const rawTitle =
    titleArg ?? (await input({ message: await t("askTaskTitle") }));
  const title = taskTitleSchema.parse(rawTitle);

  const spinner = ora(await t("loading")).start();
  await updateTask(token, taskId, {
    title,
    updatedAt: Date.now(),
  });
  spinner.succeed();

  renderSuccess(await t("taskUpdated"));
}
