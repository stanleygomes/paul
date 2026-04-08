import { generateUUID } from "@paul/utils";
import { createApiClient } from "../../api/api";
import { DEFAULT_PROJECT_COLOR } from "../../constants/project.constant";
import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { renderSuccess } from "../../utils/output.util";
import { askAndParse } from "../../utils/prompt.util";
import { runWithLoading } from "../../utils/spinner.util";
import { ProjectValidator } from "../../validators/project.validators";

export async function runCreateProjectModule(nameArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const name = await askAndParse({
    messageKey: "askProjectTitle",
    schema: ProjectValidator.name,
    initialValue: nameArg,
  });

  const payload = ProjectValidator.createPayload.parse({
    id: generateUUID(),
    name,
    color: DEFAULT_PROJECT_COLOR,
  });

  const api = createApiClient(token);
  await runWithLoading(() => api.project.create(payload));

  renderSuccess(await t("projectCreated"));
}
