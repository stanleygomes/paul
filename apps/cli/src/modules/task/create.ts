import { generateUUID } from "@paul/utils";
import { createApiClient } from "../../api/api";
import { settingsStore } from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import { TaskValidator } from "../../validators/task.validators";

export async function runCreateTaskModule(titleArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const settings = await settingsStore.get();
  const activeProjectId = settings.activeProjectId;

  const title = await askAndParse({
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
  await runWithLoading(() => api.task.create(payload));

  renderSuccess(await t("taskCreated"));
}
