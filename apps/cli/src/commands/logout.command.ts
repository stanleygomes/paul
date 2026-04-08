import type { Command } from "commander";
import { runLogoutModule } from "../modules/auth";

export function registerLogoutCommand(program: Command): void {
  program
    .command("logout")
    .description("Clear local session data")
    .action(runLogoutModule);
}
