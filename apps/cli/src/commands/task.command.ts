import {
  runCreateTaskModule,
  runDeleteTaskModule,
  runEditTaskModule,
  runListTasksModule,
} from "../modules/task";
import { BaseCommand } from "./base.command";

export class TaskCommand extends BaseCommand {
  public register(): void {
    const taskCommand = this.program
      .command("task")
      .description("Task management");

    taskCommand
      .command("list")
      .description("List tasks")
      .action(runListTasksModule);

    taskCommand
      .command("create")
      .description("Create a task")
      .argument("[title]", "Task title")
      .action(runCreateTaskModule);

    taskCommand
      .command("edit")
      .description("Edit task title")
      .argument("[taskId]", "Task id")
      .argument("[title]", "Task title")
      .action(runEditTaskModule);

    taskCommand
      .command("delete")
      .description("Delete task")
      .argument("[taskId]", "Task id")
      .action(runDeleteTaskModule);
  }
}
