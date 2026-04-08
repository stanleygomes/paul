import { getSettings } from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { selectAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import { taskIdSchema } from "../../validators/task.validators";
import { getActiveTasks } from "./list";

export async function resolveTaskId(taskId?: string): Promise<string> {
  if (taskId) {
    return taskIdSchema.parse(taskId);
  }

  const token = await requireSessionToken();
  const settings = await getSettings();
  const activeProjectId = settings.activeProjectId;

  let tasks = await runWithLoading(() => getActiveTasks(token));

  if (activeProjectId) {
    tasks = tasks.filter((task) => task.projectId === activeProjectId);
  }

  if (tasks.length === 0) {
    throw new Error(await t("noTasks"));
  }

  return selectAndParse({
    messageKey: "selectTask",
    choices: tasks.map((task) => ({
      name: task.title,
      value: task.id,
    })),
  });
}
