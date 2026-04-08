import { select } from "@inquirer/prompts";
import { listProjects } from "../../api/resources/project";
import { getSettings, saveSettings } from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { runWithLoading } from "../../utils/spinner";

export async function runUseProjectModule(): Promise<void> {
  const token = await requireSessionToken();
  const projects = await runWithLoading(async () => {
    const allProjects = await listProjects(token);
    return allProjects.filter((project) => !project.isDeleted);
  });

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

  const selectedProjectId = await select({
    message: await t("selectProjectToUse"),
    choices,
  });

  const settings = await getSettings();

  if (selectedProjectId === "none") {
    delete settings.activeProjectId;
    delete settings.activeProjectName;
    await saveSettings(settings);
    renderSuccess(await t("projectDeactivated"));
    return;
  }

  const project = projects.find((p) => p.id === selectedProjectId);
  settings.activeProjectId = selectedProjectId;
  settings.activeProjectName = project?.name;
  await saveSettings(settings);

  renderSuccess(
    (await t("projectActivated")).replace("{name}", project?.name || ""),
  );
}
