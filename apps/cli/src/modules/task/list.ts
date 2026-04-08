import { createApiClient } from "../../api/api";
import { settingsStore } from "../../store/settings.store";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Loader } from "../../utils/spinner.util";
import { TaskFormatter } from "../../utils/format/task-format.util";

export class ListTasksModule {
  public static async getActiveTasks(token: string) {
    const api = createApiClient(token);
    const allTasks = await api.task.list();
    return allTasks.filter((task) => !task.isDeleted);
  }

  public static async run(): Promise<void> {
    const token = await AuthGuard.requireToken();
    const settings = await settingsStore.get();
    const activeProjectId = settings.activeProjectId;

    let tasks = await Loader.run(() => this.getActiveTasks(token));

    if (activeProjectId) {
      tasks = tasks.filter((task) => task.projectId === activeProjectId);
      Output.info(
        (await t("activeProjectInfo")).replace(
          "{name}",
          settings.activeProjectName || "",
        ),
      );
    }

    if (tasks.length === 0) {
      Output.info(await t("noTasks"));
      return;
    }

    for (const task of tasks) {
      console.log(TaskFormatter.formatLine(task));
    }
  }
}
