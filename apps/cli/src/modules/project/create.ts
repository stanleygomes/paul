import { generateUUID } from "@paul/utils";
import { createProject } from "../../api/resources/project";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import {
  createProjectPayloadSchema,
  projectNameSchema,
} from "../../validators/project.validators";

const DEFAULT_PROJECT_COLOR = "#4F46E5";

export async function runCreateProjectModule(nameArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const name = await askAndParse({
    messageKey: "askProjectTitle",
    schema: projectNameSchema,
    initialValue: nameArg,
  });

  const payload = createProjectPayloadSchema.parse({
    id: generateUUID(),
    name,
    color: DEFAULT_PROJECT_COLOR,
  });

  await runWithLoading(() => createProject(token, payload));

  renderSuccess(await t("projectCreated"));
}
