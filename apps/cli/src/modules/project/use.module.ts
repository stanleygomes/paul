import { settingsStore } from "../../store/settings.store";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Prompt } from "../../utils/prompt.util";
import { Loader } from "../../utils/spinner.util";
import { ListProjectsModule } from "./list.module";

export class UseProjectModule {
  public static async run(): Promise<void> {
    const token = await AuthGuard.requireToken();
    const projects = await Loader.run(() =>
      ListProjectsModule.getActiveProjects(token),
    );

    const choices = [
      {
        name: await t("none"),
        value: "none",
      },
      ...projects.map((p) => ({
        name: p.name,
        value: p.id,
      })),
    ];

    const selectedProjectId = await Prompt.select({
      messageKey: "selectProjectToUse",
      choices,
    });

    if (selectedProjectId === "none") {
      await settingsStore.clearActiveProject();
      Output.success(await t("projectDeactivated"));
      return;
    }

    const project = projects.find((p) => p.id === selectedProjectId);
    if (project) {
      await settingsStore.setActiveProject(project.id, project.name);

      Output.success(
        (await t("projectActivated")).replace("{name}", project.name),
      );
    }
  }
}
