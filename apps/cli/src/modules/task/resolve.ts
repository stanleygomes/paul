import { settingsStore } from "../../store/settings.store";
import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { selectAndParse } from "../../utils/prompt.util";
import { runWithLoading } from "../../utils/spinner.util";
import { TaskValidator } from "../../validators/task.validators";
import { getActiveTasks } from "./list";

export async function resolveTaskId(taskId?: string): Promise<string> {
  if (taskId) {
    return TaskValidator.id.parse(taskId);
  }

  const token = await requireSessionToken();
  const settings = await settingsStore.get();
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
