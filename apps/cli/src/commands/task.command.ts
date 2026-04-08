import { CreateTaskModule } from "../modules/task/create.module";
import { DeleteTaskModule } from "../modules/task/delete.module";
import { ListTasksModule } from "../modules/task/list.module";
import { UpdateTaskModule } from "../modules/task/update.module";

import { BaseCommand } from "./base.command";

export class TaskCommand extends BaseCommand {
  public register(): void {
    const taskCommand = this.program
      .command("task")
      .description("Task management");

    taskCommand
      .command("list")
      .description("List tasks")
      .action(ListTasksModule.run);

    taskCommand
      .command("create")
      .description("Create a task")
      .argument("[title]", "Task title")
      .action(CreateTaskModule.run);

    taskCommand
      .command("edit")
      .description("Edit task title")
      .argument("[taskId]", "Task id")
      .argument("[title]", "Task title")
      .action(UpdateTaskModule.run);

    taskCommand
      .command("delete")
      .description("Delete task")
      .argument("[taskId]", "Task id")
      .action(DeleteTaskModule.run);
  }
}
