import {
  runCreateProjectModule,
  runDeleteProjectModule,
  runEditProjectModule,
  runListProjectsModule,
  runUseProjectModule,
} from "../modules/project";
import { BaseCommand } from "./base.command";

export class ProjectCommand extends BaseCommand {
  public register(): void {
    const projectCommand = this.program
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

    projectCommand
      .command("use")
      .description("Set active project for terminal session")
      .action(runUseProjectModule);
  }
}
