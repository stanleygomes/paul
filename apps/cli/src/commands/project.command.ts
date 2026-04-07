import type { Command } from "commander";
import {
  runCreateProjectModule,
  runDeleteProjectModule,
  runEditProjectModule,
  runListProjectsModule,
} from "../modules/project.module";

export function registerProjectCommand(program: Command): void {
  const projectCommand = program
    .command("project")
    .description("Project management");

  projectCommand
    .command("list")
    .description("List projects")
    .action(runListProjectsModule);

  projectCommand
    .command("create")
    .description("Create a project")
    .argument("[title]", "Project title")
    .action(runCreateProjectModule);

  projectCommand
    .command("edit")
    .description("Edit project title")
    .argument("[projectId]", "Project id")
    .argument("[title]", "Project title")
    .action(runEditProjectModule);

  projectCommand
    .command("delete")
    .description("Delete project")
    .argument("[projectId]", "Project id")
    .action(runDeleteProjectModule);
}
