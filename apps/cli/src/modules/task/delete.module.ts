import { createApiClient } from "../../api/api";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Loader } from "../../utils/spinner.util";
import { ResolveTaskModule } from "./resolve.module";

export class DeleteTaskModule {
  public static async run(taskIdArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const taskId = await ResolveTaskModule.resolveId(taskIdArg);

    const api = createApiClient(token);
    await Loader.run(() => api.task.delete(taskId));

    Output.success(await t("taskDeleted"));
  }
}
