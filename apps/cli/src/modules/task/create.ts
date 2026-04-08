import { generateUUID } from "@paul/utils";
import { createApiClient } from "../../api/api";
import { settingsStore } from "../../store/settings.store";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Prompt } from "../../utils/prompt.util";
import { Loader } from "../../utils/spinner.util";
import { TaskValidator } from "../../validators/task.validators";

export class CreateTaskModule {
  public static async run(titleArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const settings = await settingsStore.get();
    const activeProjectId = settings.activeProjectId;

    const title = await Prompt.ask({
      messageKey: "askTaskTitle",
      schema: TaskValidator.title,
      initialValue: titleArg,
    });

    const payload = TaskValidator.createPayload.parse({
      id: generateUUID(),
      title,
      content: "",
      done: false,
      notes: "",
      important: false,
      dueDate: "",
      dueTime: "",
      url: "",
      subtasks: [],
      tags: [],
      isDeleted: false,
      projectId: activeProjectId || null,
    });

    const api = createApiClient(token);
    await Loader.run(() => api.task.create(payload));

    Output.success(await t("taskCreated"));
  }
}
