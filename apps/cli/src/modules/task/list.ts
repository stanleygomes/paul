import { createApiClient } from "../../api/api";
import { settingsStore } from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderInfo } from "../../utils/output";
import { runWithLoading } from "../../utils/spinner";
import { formatTaskLine } from "../../utils/format/task-format";

export async function getActiveTasks(token: string) {
  const api = createApiClient(token);
  const allTasks = await api.task.list();
  return allTasks.filter((task) => !task.isDeleted);
}

export async function runListTasksModule(): Promise<void> {
  const token = await requireSessionToken();
  const settings = await settingsStore.get();
  const activeProjectId = settings.activeProjectId;

  let tasks = await runWithLoading(() => getActiveTasks(token));

  if (activeProjectId) {
    tasks = tasks.filter((task) => task.projectId === activeProjectId);
    renderInfo(
      (await t("activeProjectInfo")).replace(
        "{name}",
        settings.activeProjectName || "",
      ),
    );
  }

  if (tasks.length === 0) {
    renderInfo(await t("noTasks"));
    return;
  }

  for (const task of tasks) {
    console.log(formatTaskLine(task));
  }
}
