import { input, select } from "@inquirer/prompts";
import { generateUUID } from "@paul/utils";
import ora from "ora";
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject,
} from "../api/project-api";
import { requireSessionToken } from "../utils/auth-guard";
import { t } from "../utils/i18n";
import { renderInfo, renderSuccess } from "../utils/output";
import { formatProjectLine } from "../utils/project-format";
import {
  createProjectPayloadSchema,
  projectIdSchema,
  projectNameSchema,
} from "../validators/project.validators";

const DEFAULT_PROJECT_COLOR = "#4F46E5";

async function resolveProjectId(projectId?: string): Promise<string> {
  if (projectId) {
    return projectIdSchema.parse(projectId);
  }

  const token = await requireSessionToken();
  const projects = (await listProjects(token)).filter(
    (project) => !project.isDeleted,
  );

  if (projects.length === 0) {
    throw new Error(await t("noProjects"));
  }

  return select({
    message: await t("selectProject"),
    choices: projects.map((project) => ({
      name: project.name,
      value: project.id,
    })),
  });
}

export async function runListProjectsModule(): Promise<void> {
  const token = await requireSessionToken();
  const spinner = ora(await t("loading")).start();
  const projects = (await listProjects(token)).filter(
    (project) => !project.isDeleted,
  );
  spinner.stop();

  if (projects.length === 0) {
    renderInfo(await t("noProjects"));
    return;
  }

  for (const project of projects) {
    console.log(formatProjectLine(project));
  }
}

export async function runCreateProjectModule(nameArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const rawName =
    nameArg ?? (await input({ message: await t("askProjectTitle") }));
  const name = projectNameSchema.parse(rawName);

  const payload = createProjectPayloadSchema.parse({
    id: generateUUID(),
    name,
    color: DEFAULT_PROJECT_COLOR,
  });

  const spinner = ora(await t("loading")).start();
  await createProject(token, payload);
  spinner.succeed();

  renderSuccess(await t("projectCreated"));
}

export async function runEditProjectModule(
  projectIdArg?: string,
  nameArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const projectId = await resolveProjectId(projectIdArg);
  const rawName =
    nameArg ?? (await input({ message: await t("askProjectTitle") }));
  const name = projectNameSchema.parse(rawName);

  const spinner = ora(await t("loading")).start();
  await updateProject(token, projectId, {
    name,
    updatedAt: Date.now(),
  });
  spinner.succeed();

  renderSuccess(await t("projectUpdated"));
}

export async function runDeleteProjectModule(
  projectIdArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const projectId = await resolveProjectId(projectIdArg);

  const spinner = ora(await t("loading")).start();
  await deleteProject(token, projectId);
  spinner.succeed();

  renderSuccess(await t("projectDeleted"));
}
