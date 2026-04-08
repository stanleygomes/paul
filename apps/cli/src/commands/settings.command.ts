import { SetLanguageModule } from "../modules/settings/set-language.module";
import { BaseCommand } from "./base.command";

export class SettingsCommand extends BaseCommand {
  public register(): void {
    const settingsCommand = this.program
      .command("settings")
      .description("CLI settings");

    settingsCommand
      .command("language")
      .description("Change language (en|pt)")
      .argument("[language]", "Language code")
      .action(SetLanguageModule.run);
  }
}
