import { createApiClient } from "../../api/api";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Loader } from "../../utils/spinner.util";
import { ResolveProjectModule } from "./resolve.module";

export class DeleteProjectModule {
  public static async run(projectIdArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const projectId = await ResolveProjectModule.resolveId(projectIdArg);

    const api = createApiClient(token);
    await Loader.run(() => api.project.delete(projectId));

    Output.success(await t("projectDeleted"));
  }
}
