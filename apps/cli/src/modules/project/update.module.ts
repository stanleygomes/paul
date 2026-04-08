import { createApiClient } from "../../api/api";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Prompt } from "../../utils/prompt.util";
import { Loader } from "../../utils/spinner.util";
import { ProjectValidator } from "../../validators/project.validators";
import { ResolveProjectModule } from "./resolve.module";

export class UpdateProjectModule {
  public static async run(
    projectIdArg?: string,
    nameArg?: string,
  ): Promise<void> {
    const token = await AuthGuard.requireToken();
    const projectId = await ResolveProjectModule.resolveId(projectIdArg);
    const name = await Prompt.ask({
      messageKey: "askProjectTitle",
      schema: ProjectValidator.name,
      initialValue: nameArg,
    });

    const api = createApiClient(token);
    await Loader.run(() =>
      api.project.update(projectId, {
        name,
        updatedAt: Date.now(),
      }),
    );

    Output.success(await t("projectUpdated"));
  }
}
