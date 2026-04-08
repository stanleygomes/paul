import { generateUUID } from "@paul/utils";
import { createTask } from "../../api/resources/task";
import { getSettings } from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import {
  createTaskPayloadSchema,
  taskTitleSchema,
} from "../../validators/task.validators";

export async function runCreateTaskModule(titleArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const settings = await getSettings();
  const activeProjectId = settings.activeProjectId;

  const title = await askAndParse({
    messageKey: "askTaskTitle",
    schema: taskTitleSchema,
    initialValue: titleArg,
  });

  const payload = createTaskPayloadSchema.parse({
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

  await runWithLoading(() => createTask(token, payload));

  renderSuccess(await t("taskCreated"));
}
