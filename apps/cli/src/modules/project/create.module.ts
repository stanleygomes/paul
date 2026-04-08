import { generateUUID } from "@paul/utils";
import { createApiClient } from "../../api/api";
import { DEFAULT_PROJECT_COLOR } from "../../constants/project.constant";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Prompt } from "../../utils/prompt.util";
import { Loader } from "../../utils/spinner.util";
import { ProjectValidator } from "../../validators/project.validators";

export class CreateProjectModule {
  public static async run(nameArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const name = await Prompt.ask({
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
    await Loader.run(() => api.project.create(payload));

    Output.success(await t("projectCreated"));
  }
}
