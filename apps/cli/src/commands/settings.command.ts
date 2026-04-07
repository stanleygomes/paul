import type { Command } from "commander";
import { runSetLanguageModule } from "../modules/settings.module";

export function registerSettingsCommand(program: Command): void {
  const settingsCommand = program
    .command("settings")
    .description("CLI settings");

  settingsCommand
    .command("language")
    .description("Change language (en|pt)")
    .argument("[language]", "Language code")
    .action(runSetLanguageModule);
}
