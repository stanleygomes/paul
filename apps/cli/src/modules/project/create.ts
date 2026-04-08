import { generateUUID } from "@paul/utils";
import { createApiClient } from "../../api";
import { DEFAULT_PROJECT_COLOR } from "../../constants/project.constants";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { askAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
import {
  createProjectPayloadSchema,
  projectNameSchema,
} from "../../validators/project.validators";

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

  const api = createApiClient(token);
  await runWithLoading(() => api.project.create(payload));

  renderSuccess(await t("projectCreated"));
}
