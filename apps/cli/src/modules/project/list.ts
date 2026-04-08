import { createApiClient } from "../../api/api";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Loader } from "../../utils/spinner.util";
import { ProjectFormatter } from "../../utils/format/project-format.util";

export class ListProjectsModule {
  public static async getActiveProjects(token: string) {
    const api = createApiClient(token);
    const allProjects = await api.project.list();
    return allProjects.filter((project) => !project.isDeleted);
  }

  public static async run(): Promise<void> {
    const token = await AuthGuard.requireToken();
    const projects = await Loader.run(() => this.getActiveProjects(token));

    if (projects.length === 0) {
      Output.info(await t("noProjects"));
      return;
    }

    for (const project of projects) {
      console.log(ProjectFormatter.formatLine(project));
    }
  }
}
