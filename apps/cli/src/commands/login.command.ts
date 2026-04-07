import type { Command } from "commander";
import { runLoginModule } from "../modules/auth.module";

export function registerLoginCommand(program: Command): void {
  program
    .command("login")
    .description("Login with email and verification code")
    .action(runLoginModule);
}
