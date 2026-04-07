import { input, select } from "@inquirer/prompts";
import { generateUUID } from "@paul/utils";
import ora from "ora";
import { createTask, deleteTask, listTasks, updateTask } from "../api/task-api";
import { requireSessionToken } from "../utils/auth-guard";
import { t } from "../utils/i18n";
import { renderInfo, renderSuccess } from "../utils/output";
import { formatTaskLine } from "../utils/task-format";
import {
  createTaskPayloadSchema,
  taskIdSchema,
  taskTitleSchema,
} from "../validators/task.validators";

async function resolveTaskId(taskId?: string): Promise<string> {
  if (taskId) {
    return taskIdSchema.parse(taskId);
  }

  const token = await requireSessionToken();
  const tasks = (await listTasks(token)).filter((task) => !task.isDeleted);

  if (tasks.length === 0) {
    throw new Error(await t("noTasks"));
  }

  return select({
    message: await t("selectTask"),
    choices: tasks.map((task) => ({
      name: task.title,
      value: task.id,
    })),
  });
}

export async function runListTasksModule(): Promise<void> {
  const token = await requireSessionToken();
  const spinner = ora(await t("loading")).start();
  const tasks = (await listTasks(token)).filter((task) => !task.isDeleted);
  spinner.stop();

  if (tasks.length === 0) {
    renderInfo(await t("noTasks"));
    return;
  }

  for (const task of tasks) {
    console.log(formatTaskLine(task));
  }
}

export async function runCreateTaskModule(titleArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const rawTitle =
    titleArg ?? (await input({ message: await t("askTaskTitle") }));
  const title = taskTitleSchema.parse(rawTitle);

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
  });

  const spinner = ora(await t("loading")).start();
  await createTask(token, payload);
  spinner.succeed();

  renderSuccess(await t("taskCreated"));
}

export async function runEditTaskModule(
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

export async function runDeleteTaskModule(taskIdArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const taskId = await resolveTaskId(taskIdArg);

  const spinner = ora(await t("loading")).start();
  await deleteTask(token, taskId);
  spinner.succeed();

  renderSuccess(await t("taskDeleted"));
}
