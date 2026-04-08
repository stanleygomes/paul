import {
  clearActiveProject,
  setActiveProject,
} from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { selectAndParse } from "../../utils/prompt";
import { runWithLoading } from "../../utils/spinner";
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
    await clearActiveProject();
    renderSuccess(await t("projectDeactivated"));
    return;
  }

  const project = projects.find((p) => p.id === selectedProjectId);
  if (project) {
    await setActiveProject(project.id, project.name);

    renderSuccess(
      (await t("projectActivated")).replace("{name}", project.name),
    );
  }
}
