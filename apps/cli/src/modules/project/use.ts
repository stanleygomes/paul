import { settingsStore } from "../../store/settings.store";
import { requireSessionToken } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { renderSuccess } from "../../utils/output.util";
import { selectAndParse } from "../../utils/prompt.util";
import { runWithLoading } from "../../utils/spinner.util";
import { getActiveProjects } from "./list";

export async function runUseProjectModule(): Promise<void> {
  const token = await requireSessionToken();
  const projects = await runWithLoading(() => getActiveProjects(token));

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

  const selectedProjectId = await selectAndParse({
    messageKey: "selectProjectToUse",
    choices,
  });

  if (selectedProjectId === "none") {
    await settingsStore.clearActiveProject();
    renderSuccess(await t("projectDeactivated"));
    return;
  }

  const project = projects.find((p) => p.id === selectedProjectId);
  if (project) {
    await settingsStore.setActiveProject(project.id, project.name);

    renderSuccess(
      (await t("projectActivated")).replace("{name}", project.name),
    );
  }
}
