import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Prompt } from "../../utils/prompt.util";
import { Loader } from "../../utils/spinner.util";
import { ProjectValidator } from "../../validators/project.validators";
import { ListProjectsModule } from "./list.module";

export class ResolveProjectModule {
  public static async resolveId(projectId?: string): Promise<string> {
    if (projectId) {
      return ProjectValidator.id.parse(projectId);
    }

    const token = await AuthGuard.requireToken();
    const projects = await Loader.run(() =>
      ListProjectsModule.getActiveProjects(token),
    );

    if (projects.length === 0) {
      throw new Error(await t("noProjects"));
    }

    return Prompt.select({
      messageKey: "selectProject",
      choices: projects.map((project) => ({
        name: project.name,
        value: project.id,
      })),
    });
  }
}
