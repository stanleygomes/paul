import { CreateProjectModule } from "../modules/project/create.module";
import { DeleteProjectModule } from "../modules/project/delete.module";
import { ListProjectsModule } from "../modules/project/list.module";
import { UpdateProjectModule } from "../modules/project/update.module";
import { UseProjectModule } from "../modules/project/use.module";

import { BaseCommand } from "./base.command";

export class ProjectCommand extends BaseCommand {
  public register(): void {
    const projectCommand = this.program
      .command("project")
      .description("Project management");

    projectCommand
      .command("list")
      .description("List projects")
      .action(ListProjectsModule.run);

    projectCommand
      .command("create")
      .description("Create a project")
      .argument("[title]", "Project title")
      .action(CreateProjectModule.run);

    projectCommand
      .command("edit")
      .description("Edit project title")
      .argument("[projectId]", "Project id")
      .argument("[title]", "Project title")
      .action(UpdateProjectModule.run);

    projectCommand
      .command("delete")
      .description("Delete project")
      .argument("[projectId]", "Project id")
      .action(DeleteProjectModule.run);

    projectCommand
      .command("use")
      .description("Set active project for terminal session")
      .action(UseProjectModule.run);
  }
}
